
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
        [Route("admin-signup")]
        [Authorize(Roles = UserRoles.Admin)]
        public IActionResult AdminRegistration([FromBody] UserRegistrationDTO dto)
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

        [HttpDelete("remove-file")]
        [Authorize]
        public IActionResult RemoveFileFromUser()
        {
            try
            {
                var identity = User?.Identity;
                if (identity != null)
                {
                    var username = identity.Name;

                    if (username != null)
                    {
                        var user = _service.RemoveUserFile(username);

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

                        System.IO.File.Delete(filePath);

                        return Ok("File removed successfully");
                    }
                }
                else
                {
                    return NotFound("User not found");
                }

                return NotFound("Something went wrong during the request");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("file")]
        [Authorize]
        public async Task<IActionResult> OnPostUploadAsync(IFormFile file)
        {
     
            string fileName;
            try
            {
                var identity = User?.Identity;
                if (identity != null)
                {
                    var username = identity.Name;
                    if (username != null)
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
                    } else {
                        return NotFound("User Not Found");
                    }
                    return Ok("File Uploaded");
                } else {
                    return NotFound("User Not Found");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("get-file")]
        [Authorize]
        public IActionResult GetFileFromUserTesting()
        {
            try
            {
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
                        var fileBytes = System.IO.File.ReadAllBytes(filePath);

                        // Defina o tipo MIME do arquivo com base na extensão do arquivo
                        var contentType = GetContentType(user.ProfileImage);

                        // Retorne os dados do arquivo como uma resposta JSON
                        return File(fileBytes, contentType);

                        // Retorne os dados do arquivo como uma resposta JSON
                        // return Ok(new { success = true, filePath });
                    }
                }
                else
                {
                    return NotFound("User Not Found");
                }

                return NotFound("Something went wrong during the request");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        private string GetContentType(string fileName)
        {
            var provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(fileName, out var contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }

    }
}

