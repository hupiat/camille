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
    }
}
