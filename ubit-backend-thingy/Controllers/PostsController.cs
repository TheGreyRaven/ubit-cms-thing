using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using uBit_Backend_Thingy.DBContext;
using uBit_Backend_Thingy.Models;

namespace uBit_Backend_Thingy.Controllers
{
    [Route("/api/")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("posts")]
        public async Task<IActionResult> GetPostsPreview()
        {
            var posts = await _context.postModels.ToListAsync();

            return Ok(posts);
        }

        [HttpPost]
        [Route("create-post")]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostModel model)
        {
            var post = new CreatePostModel
            {
                ImageURL = model.ImageURL,
                PostTitle = model.PostTitle,
                PostBody = model.PostBody
            };

            await _context.postModels.AddAsync(post);
            await _context.SaveChangesAsync();

            return Ok(post);
        }

        [HttpPost]
        [Route("delete-post")]
        public async Task<IActionResult> DeletePost([FromBody] DeletePostModel model)
        {
            _context.postModels.Remove(new CreatePostModel { PostId = model.PostId });
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost]
        [Route("update-post")]
        public async Task<IActionResult> UpdatePost([FromBody] CreatePostModel model)
        {
            var post = await _context.postModels.SingleOrDefaultAsync(p => p.PostId == model.PostId);

            post.PostTitle = model.PostTitle;
            post.PostBody = model.PostBody;
            post.ImageURL = model.ImageURL;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("get-post")]
        public async Task<IActionResult> GetPost([FromBody] GetPostModel model)
        {
            var post = await _context.postModels.SingleOrDefaultAsync(p => p.PostId == model.PostId);

            return Ok(post);
        }
    }
}
