
using lifecare.Data;
using Microsoft.AspNetCore.Mvc;

namespace lifecare.Controllers
{
    
    [Route("v1/record")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        public RecordController(){ }

        [HttpGet]
        [Route("")]
        public IActionResult GetRecord()
        {
            try
            {

                return Ok("HelloWorld");

            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        [Route("")]
        public IActionResult Save()
        {
            try
            {

                return Ok("HelloWorld");

            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}