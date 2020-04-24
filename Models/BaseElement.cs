using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace camille.Models
{
    public class BaseElement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateCreation { get; set; }

        [Required]
        [Index(IsUnique = true)]
        public string Name { get; set; }

        public BaseElement()
        {
        }

        public BaseElement(int id, string name)
        {
            ID = id;
            Name = name;
        }
    }
}
