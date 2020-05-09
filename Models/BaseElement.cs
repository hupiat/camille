using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    public abstract class BaseElement : DatabaseElement
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateCreation { get; set; } = DateTime.UtcNow;

        [Required]
        [Index(IsUnique = true)]
        public string Name { get; set; }

    }
}
