using System;
using System.Collections.Generic;
using camille.Models;
using System.Linq;
using camille.Helpers;

namespace camille.DAL
{
    public class PatternRepository
    {
        private readonly PatternContext _context;

        public PatternRepository(PatternContext context) => _context = context;

        public ICollection<Pattern> FetchAllPatterns()
        {
            ICollection<Pattern> patterns = new HashSet<Pattern>();

            foreach (Pattern pattern in _context.Patterns)
            {
                pattern.Bonds = CollectionHelper<PatternElementBond>
                    .Where(_context.PatternElementBonds, b => b.PatternId == pattern.ID);

                pattern.PatternTags = CollectionHelper<PatternTag>
                    .Where(_context.PatternTags, pt => pt.PatternId == pattern.ID);

                patterns.Add(pattern);
            }

            return patterns;
        }

        public ICollection<PatternElement> FetchAllPatternElements()
        {
            ICollection<PatternElement> elements = new HashSet<PatternElement>();

            foreach (PatternElement element in _context.PatternElements)
            {
                element.Bonds = CollectionHelper<PatternElementBond>
                    .Where(_context.PatternElementBonds, b => b.PatternElementId == element.ID);

                elements.Add(element);
            }

            return elements;
        }

        public ICollection<Tag> FetchAllTags()
        {
            ICollection<Tag> tags = new HashSet<Tag>();

            foreach (Tag tag in _context.Tags)
            {
                tag.PatternTags = CollectionHelper<PatternTag>
                    .Where(_context.PatternTags, pt => pt.TagId == tag.ID);

                tags.Add(tag);
            }

            return tags;
        }

        public ICollection<PatternElementBond> FetchAllBonds()
        {
            ICollection<PatternElementBond> bonds = new HashSet<PatternElementBond>();

            foreach (PatternElementBond bond in _context.PatternElementBonds)
            {
                bonds.Add(bond);
            }

            return bonds;
        }

        public ICollection<PatternElementPosition> FetchAllPositions()
        {
            ICollection<PatternElementPosition> positions = new HashSet<PatternElementPosition>();

            foreach (PatternElementPosition position in _context.PatternElementPositions)
            {
                positions.Add(position);
            }

            return positions;
        }

        public ICollection<PatternTag> FetchAllPatternTags()
        {
            ICollection<PatternTag> patternTags = new HashSet<PatternTag>();

            foreach (PatternTag patternTag in _context.PatternTags)
            {
                patternTags.Add(patternTag);
            }

            return patternTags;
        }

        public void Insert(Pattern pattern) => _context.Transaction(() =>
        {
            ApplyElementsInsertionReconciliation(pattern);
            ApplyTagsInsertionReconciliation(pattern);
            _context.Patterns.Add(pattern);
            _context.SaveChanges();
        });

        public void Update(Pattern pattern)
        {
            Pattern patternInDb = _context.Patterns.Find(pattern.ID);

            if (patternInDb == null)
            {
                throw new ArgumentException($"No pattern found matching with {pattern.ID}");
            }

            patternInDb.Name = pattern.Name;
            patternInDb.DateCreation = pattern.DateCreation;
            patternInDb.Bonds = pattern.Bonds;
            patternInDb.PatternTags = pattern.PatternTags;


            _context.Transaction(() =>
            {
                ApplyElementsInsertionReconciliation(pattern);
                ApplyTagsInsertionReconciliation(pattern);
                _context.Patterns.Update(pattern);
                _context.SaveChanges();
            });
        }

        public void RemovePattern(int id)
        {
            Pattern pattern = _context.Patterns.Find(id);

            _context.Transaction(() =>
            {
                foreach (PatternElementBond bond in pattern.Bonds)
                {
                    ICollection<PatternElement> elements = CollectionHelper<PatternElement>
                        .Where(_context.PatternElements, e => e.Bonds.All(b => b.ID == bond.ID));

                    foreach (PatternElement element in elements)
                    {
                        RemovePatternElementWithoutTransaction(element.ID);
                    }

                }

                foreach (PatternTag patternTag in pattern.PatternTags)
                {
                    ICollection<Tag> tags = CollectionHelper<Tag>
                        .Where(_context.Tags, t => t.PatternTags.All(pt => pt.ID == patternTag.ID));

                    foreach (Tag tag in tags)
                    {
                        RemoveTagWithoutTransaction(tag.ID);
                    }
                }

                pattern.Bonds.Clear();
                pattern.PatternTags.Clear();

                _context.Patterns.Remove(pattern);
                _context.SaveChanges();
            });
        }

        public void RemovePatternElement(int id) => _context.Transaction(() => RemovePatternElementWithoutTransaction(id));

        public void RemoveTag(int id) => _context.Transaction(() => RemoveTagWithoutTransaction(id));

        private void RemovePatternElementWithoutTransaction(int id)
        {
            PatternElement element = _context.PatternElements.Find(id);

            if (element == null)
            {
                throw new ArgumentException($"No pattern element found matching with {id}");
            }

            ICollection<PatternElementBond> bondsRelated = CollectionHelper<PatternElementBond>
                    .Where(_context.PatternElementBonds, b => b.NextPatternElementId == id);

            foreach (PatternElementBond bond in bondsRelated)
            {
                bond.NextPatternElementId = 0;
            }

            element.Bonds.Clear();

            _context.PatternElements.Remove(element);
            _context.SaveChanges();
        }

        private void RemoveTagWithoutTransaction(int id)
        {
            Tag tag = _context.Tags.Find(id);

            if (tag == null)
            {
                throw new ArgumentException($"No tag found matching with {id}");
            }

            ICollection<PatternTag> patternTags = CollectionHelper<PatternTag>
                    .Where(_context.PatternTags, pt => pt.TagId == id);

            tag.PatternTags.Clear();

            _context.Tags.Remove(tag);
            _context.SaveChanges();
        }

        private void ApplyElementsInsertionReconciliation(Pattern pattern)
        {
            foreach (PatternElementBond bond in pattern.Bonds)
            {
                if (!_context.PatternElements.Any(el => el.Name == bond.NameElement))
                {
                    PatternElement element = new PatternElement
                    {
                        Name = bond.NameElement,
                    };

                    _context.PatternElements.Add(element);
                    _context.SaveChanges();
                    bond.PatternElementId = element.ID;
                }
                else
                {
                    PatternElementBond existing = _context.PatternElementBonds
                        .AsEnumerable()
                        .FirstOrDefault(b => b.NameElement == bond.NameElement);

                    if (existing == null)
                    {
                        throw new ArgumentException($"No bound found for id {bond.ID}");
                    }

                    bond.PatternElementId = existing.PatternElementId;
                    bond.NameElement = existing.NameElement;
                    bond.NextPatternElementId = existing.NextPatternElementId;
                    bond.Position = existing.Position;
                }

                bond.PatternId = pattern.ID;
            }
        }

        private void ApplyTagsInsertionReconciliation(Pattern pattern)
        {
            foreach (PatternTag patternTag in pattern.PatternTags)
            {
                if (!_context.Tags.Any(t => t.Name == patternTag.NameTag))
                {
                    Tag tag = new Tag
                    {
                        Name = patternTag.NameTag,
                    };

                    _context.Tags.Add(tag);
                    _context.SaveChanges();
                    patternTag.TagId = tag.ID;
                }
                else
                {
                    PatternTag existing = _context.PatternTags
                        .AsEnumerable()
                        .FirstOrDefault(pt => pt.NameTag == patternTag.NameTag);

                    if (existing == null)
                    {
                        throw new ArgumentException($"No patternTag found for id {patternTag.ID}");
                    }

                    patternTag.NameTag = existing.NameTag;
                    patternTag.TagId = existing.TagId;
                }

                patternTag.PatternId = pattern.ID;
            }
        }
    }
}
