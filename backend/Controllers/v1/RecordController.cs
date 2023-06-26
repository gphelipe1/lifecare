
using lifecare.DTO;
using lifecare.Helpers;
using lifecare.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace lifecare.Controllers
{
    
    [Route("record")]
    [ApiController]
    [Authorize(Roles = UserRoles.Admin)]
    public class RecordController : ControllerBase
    {
        private readonly IRecordService _service;

        public RecordController(IRecordService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("create")]
        public ActionResult<RecordDTO> Create([FromBody] RecordDTO recordDTO)
        {
            try
            {
                var record = _service.Create(recordDTO);
                return Ok(record);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        [Route("update")]
        public ActionResult<RecordDTO> Update([FromBody] RecordDTO recordDTO)
        {
            try {

            var record = _service.Update(recordDTO);
            return Ok(record);

            } catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpDelete]
        [Route("delete")]
        public ActionResult<RecordDTO?> Delete(int id)
        {
            try {

            var record = _service.Delete(id);
            return Ok(record);

            } catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpGet]
        [Route("get-all")]
        public IActionResult GetAll()
        {
            try
            {
                var records = _service.GetAll();
                return Ok(records);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("by-id")]
        public ActionResult<List<RecordDTO>> GetById(int id)
        {
            try
            {
                var record = _service.GetById(id);
                return Ok(record);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("by-cpf")]
        public ActionResult<List<RecordDTO>?> GetByCPF(string cpf)
        {
            try {

            var record = _service.GetByCPF(cpf);
            return Ok(record);

            } catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}