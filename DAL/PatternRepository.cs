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

    public int CountPatterns() => _context.Patterns.Count();

    public ICollection<Pattern> FetchAllPatterns()
    {
      ICollection<Pattern> patterns = new HashSet<Pattern>();

      foreach (Pattern pattern in _context.Patterns)
      {
        pattern.Bonds = CollectionHelper<PatternElementBond>
            .Where(_context.PatternElementBonds, b => b.PatternID == pattern.ID);

        pattern.PatternTags = CollectionHelper<PatternTag>
            .Where(_context.PatternTags, pt => pt.PatternID == pattern.ID);

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
            .Where(_context.PatternElementBonds, b => b.PatternElementID == element.ID);

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
            .Where(_context.PatternTags, pt => pt.TagID == tag.ID);

        tags.Add(tag);
      }

      return tags;
    }

    public ICollection<PatternElementBond> FetchAllBonds() => _context.PatternElementBonds.ToHashSet();

    public ICollection<PatternTag> FetchAllPatternTags() => _context.PatternTags.ToHashSet();

    public ICollection<Vector> FetchAllVectors() => _context.Vectors.ToHashSet();

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
              .Where(_context.PatternElementBonds, b => b.NextPatternElementID == id);

      foreach (PatternElementBond bond in bondsRelated)
      {
        bond.NextPatternElementID = 0;
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
              .Where(_context.PatternTags, pt => pt.TagID == id);

      tag.PatternTags.Clear();

      _context.Tags.Remove(tag);
      _context.SaveChanges();
    }

    private void ApplyElementsInsertionReconciliation(Pattern pattern)
    {
      foreach (PatternElementBond bond in pattern.Bonds)
      {
        bond.PatternID = pattern.ID;

        if (!_context.PatternElements.AsEnumerable().Any(el => el.Name == bond.NameElement))
        {
          PatternElement element = new PatternElement
          {
            Name = bond.NameElement,
          };

          _context.PatternElements.Add(element);
          _context.SaveChanges();
          bond.PatternElementID = element.ID;
        }
        else
        {
          PatternElementBond existing = _context.PatternElementBonds
              .AsEnumerable()
              .FirstOrDefault(b => b.NameElement == bond.NameElement);

          if (existing == null)
          {
            throw new ArgumentException($"No bound found matching with id {bond.ID}");
          }

          bond.PatternElementID = existing.PatternElementID;
          bond.NameElement = existing.NameElement;
          bond.NextPatternElementID = existing.NextPatternElementID;
          bond.ArrowVector = existing.ArrowVector;
          bond.Position = existing.Position;
        }
      }
    }

    private void ApplyTagsInsertionReconciliation(Pattern pattern)
    {
      foreach (PatternTag patternTag in pattern.PatternTags)
      {
        if (!_context.Tags.AsEnumerable().Any(t => t.Name == patternTag.NameTag))
        {
          Tag tag = new Tag
          {
            Name = patternTag.NameTag,
          };

          _context.Tags.Add(tag);
          _context.SaveChanges();
          patternTag.TagID = tag.ID;
        }
        else
        {
          PatternTag existing = _context.PatternTags
              .AsEnumerable()
              .FirstOrDefault(pt => pt.NameTag == patternTag.NameTag);

          if (existing == null)
          {
            throw new ArgumentException($"No patternTag found matching with id {patternTag.ID}");
          }

          patternTag.NameTag = existing.NameTag;
          patternTag.TagID = existing.TagID;
        }

        patternTag.PatternID = pattern.ID;
      }
    }
  }
}
