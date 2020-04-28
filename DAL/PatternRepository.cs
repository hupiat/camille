using System;
using System.Collections.Generic;
using camille.Models;
using System.Linq;

namespace camille.DAL
{
    public class PatternRepository
    {
        private readonly PatternContext _context;

        public PatternRepository(PatternContext context)
        {
            _context = context;
        }

        public ICollection<Pattern> FetchAllPatterns()
        {
            ICollection<Pattern> patterns = new HashSet<Pattern>();

            foreach (Pattern pattern in _context.Patterns)
            {
                pattern.Bonds = _context.PatternElementsBonds
                    .Where(b => b.PatternId == pattern.ID)
                    .ToList();

                pattern.PatternTags = _context.PatternTags
                    .Where(pt => pt.PatternId == pattern.ID)
                    .ToList();

                patterns.Add(pattern);
            }

            return patterns;
        }

        public ICollection<PatternElement> FetchAllPatternElements()
        {
            ICollection<PatternElement> elements = new HashSet<PatternElement>();

            foreach (PatternElement element in _context.PatternElements)
            {
                element.Bonds = _context.PatternElementsBonds
                    .Where(b => b.PatternElementId == element.ID)
                    .ToList();

                elements.Add(element);
            }

            return elements;
        }

        public ICollection<Tag> FetchAllTags()
        {
            ICollection<Tag> tags = new HashSet<Tag>();

            foreach (Tag tag in _context.Tags)
            {
                tag.PatternTags = _context.PatternTags
                    .Where(pt => pt.TagId == tag.ID)
                    .ToList();

                tags.Add(tag);
            }

            return tags;
        }

        public void Insert(Pattern pattern)
        {
            InsertMissingBondsAndTags(pattern);
            _context.Patterns.Add(pattern);
            _context.SaveChanges();
        }

        public void Update(Pattern pattern)
        {
            Pattern patternInDb = _context.Patterns.Find(pattern.ID);

            if (patternInDb == null)
            {
                throw new ArgumentException($"No pattern matching with {pattern.ID}");
            }

            patternInDb.Name = pattern.Name;
            patternInDb.DateCreation = pattern.DateCreation;
            patternInDb.Bonds = pattern.Bonds;
            patternInDb.PatternTags = pattern.PatternTags;

            InsertMissingBondsAndTags(pattern);
            _context.SaveChanges();
        }

        public void RemovePattern(int id)
        {
            Pattern pattern = _context.Patterns.Find(id);

            foreach (PatternElement element in _context.PatternElements)
            {
                if (pattern.Bonds.Any(b => b.PatternElementId == element.ID))
                {
                    RemovePatternElement(element.ID);
                }
            }

            foreach (Tag tag in _context.Tags)
            {
                if (pattern.PatternTags.Any(pt => pt.TagId == tag.ID))
                {
                    RemoveTag(tag.ID);
                }
            }

            _context.Patterns.Remove(pattern);
            _context.SaveChanges();
        }

        public void RemovePatternElement(int id)
        {
            _context.PatternElements.Remove(_context.PatternElements.Find(id));

            ICollection<PatternElementBond> bonds = _context.PatternElementsBonds
                .Where(b => b.PatternElementId == id)
                .ToList();

            foreach (PatternElementBond bond in bonds)
            {
                _context.PatternElementsBonds.Remove(bond);
            }

            ICollection<PatternElementBond> bondsRelated = _context.PatternElementsBonds
                .Where(b => b.NextPatternElementId == id)
                .ToList();

            foreach (PatternElementBond bond in bondsRelated)
            {
                bond.NextPatternElementId = 0;
            }

            _context.SaveChanges();
        }

        public void RemoveTag(int id)
        {
            _context.Tags.Remove(_context.Tags.Find(id));

            ICollection<PatternTag> patternTags = _context.PatternTags
                .Where(pt => pt.TagId == id)
                .ToList();

            foreach (PatternTag patternTag in patternTags)
            {
                _context.PatternTags.Remove(patternTag);
            }

            _context.SaveChanges();
        }

        private void InsertMissingBondsAndTags(Pattern pattern)
        {
            foreach (PatternElementBond bond in pattern.Bonds)
            {
                if (!_context.PatternElements.Any(e => e.ID == bond.PatternElementId))
                {
                    _context.PatternElements.Add(new PatternElement
                    {
                        Name = bond.NameElement,
                    });
                }
            }

            foreach (PatternTag tag in pattern.PatternTags)
            {
                if (!_context.Tags.Any(t => t.ID == tag.ID))
                {
                    _context.Tags.Add(new Tag
                    {
                        Name = tag.NameTag,
                    });
                }
            }
        }
    }
}
