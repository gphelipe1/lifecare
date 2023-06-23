
using lifecare.DTO;
using lifecare.Helpers;
using lifecare.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

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
            try {
                var logged = _service.Login(dto);
                //If username and passoword passed on DTO exists)
                if (logged != null) {
                    
                    return Ok(logged);
                
                }else{
                
                    return Unauthorized("Credenciais Inválidas");
                
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
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
            catch (Exception e)
            {
                return BadRequest(e.Message);
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
                        var records = _service.GetUserRecords(username);
                        return Ok(records);
                    }
                }

                return BadRequest("Could not get the user Identity");
            } 
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("user-records/detail")]
        [Authorize]
        public IActionResult RetrieveUserRecordsDetail(int recordId)
        {
            try {
            
                var identity = User?.Identity;
                if (identity != null)
                {
                    var username = identity.Name;
                    
                    if (username != null)
                    {   
                        var record = _service.GetUserRecordsDetail(username, recordId);
                        return Ok(record);
                    }
                }

                return BadRequest("Could not get the user Identity");
            } 
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("file")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> OnPostUploadAsync(IFormFile file, string username)
        {
     
            string fileName;
            try
            {
                
                var extension = "." + file.FileName.Split('.')[^1];
                fileName = DateTime.Now.Ticks + extension; 
                
                var pathBuilt = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\files");

                if (!Directory.Exists(pathBuilt))
                {
                    Directory.CreateDirectory(pathBuilt);
                }

                var path = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\files",
                fileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                var updateUser = _service.SaveUserFile(fileName, username);

                return Ok("File Uploaded");

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("file")]
        [Authorize(Roles = UserRoles.Admin)]
        public IActionResult GetUserFile(string username)
        {
            var user = _service.GetByUsername(username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (string.IsNullOrEmpty(user.ProfileImage))
            {
                return NotFound("File not found");
            }

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\files", user.ProfileImage);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("File not found");
            }

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return new FileStreamResult(stream, "image/*");
        }

        [HttpGet("user-file")]
        [Authorize]
        public IActionResult GetFileFromUser()
        {
            try{
                var identity = User?.Identity;
                if (identity != null)
                {
                    var username = identity.Name;
                    
                    if (username != null)
                    { 
                        var user = _service.GetByUsername(username);

                        if (user == null)
                        {
                            return NotFound("User not found");
                        }

                        if (string.IsNullOrEmpty(user.ProfileImage))
                        {
                            return NotFound("File not found");
                        }

                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Upload\\files", user.ProfileImage);

                        if (!System.IO.File.Exists(filePath))
                        {
                            return NotFound("File not found");
                        }

                        var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
                        return new FileStreamResult(stream, "image/*");
                    }
                } else {
                    return NotFound("User Not Found");
                }

                return NotFound("Something wrong during the request");
            } catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}

