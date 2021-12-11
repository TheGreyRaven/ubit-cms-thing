using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace uBit_Backend_Thingy.Models
{
    public class CreatePostModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PostId { get; set; }
        [Required(ErrorMessage = "Post image URL is required!")]
        public string ImageURL { get; set; }

        [Required(ErrorMessage = "Post title is required!")]
        public string PostTitle { get; set; }
        [Required(ErrorMessage = "Post body is required!")]
        public string PostBody { get; set; }
    }

    public class DeletePostModel
    {
        [Required(ErrorMessage = "Post ID is required!")]
        public int PostId { get; set; }
    }
    public class GetPostModel
    {
        [Required(ErrorMessage = "Post ID is required!")]
        public int PostId { get; set; }
    }
}
