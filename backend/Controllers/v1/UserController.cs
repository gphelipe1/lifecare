
using lifecare.DTO;
using lifecare.Helpers;
using lifecare.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace lifecare.Controllerss
{
    [Route("user")]
    [ApiController]
     public class UserController : ControllerBase
    {
        private readonly IUserService _service;


        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("signin")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] UserRequestDTO dto)
        {
            var logged = _service.Login(dto);
            //If username and passoword passed on DTO exists)
            if (logged != null) {
                
                return Ok(logged);
            
            }else{
            
                return Unauthorized("Credenciais Inválidas");
            
            }
        }

        [HttpPost]
        [Route("signup")]
        [AllowAnonymous]
        public IActionResult Registration([FromBody] UserRegistrationDTO dto)
        {
            try
            {
                var created = _service.Registration(dto);
                return Ok(created);
            }
            catch(Exception e)
            {
               return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("spec-signup")]
        [Authorize(Roles = UserRoles.Admin)]
        public IActionResult AdminRegistration([FromBody] UserRequestDTO dto)
        {
            try
            {
                var created = _service.AdminRegistration(dto);
                return Ok(created);
            }
            catch(Exception e)
            {
               return BadRequest(e);
            }
        }

        [HttpGet]
        [Route("user-records")]
        [Authorize]
        public IActionResult RetrieveUserRecords()
        {
            try {
            
                var identity = User?.Identity;
                if (identity != null)
                {
                    var username = identity.Name;
                    
                    if (username != null)
                    {   
                        var record = _service.GetUserRecords(username);
                        return Ok(record);
                    }
                }

                return BadRequest("Could not get the user Identity");
            } 
            catch(Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}

