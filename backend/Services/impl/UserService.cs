using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using lifecare.DAO;
using lifecare.DTO;
using lifecare.Helpers;
using lifecare.Repositories;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace lifecare.Services
{
    public class UserService : IUserService
    {
        private readonly JwtService _appSettings;
        private readonly IUserRepository _repository;
        private readonly IRecordRepository _recordRepository;
        private readonly IMapper _mapper;
        public UserService
            (
                IOptions<JwtService> appSettings,
                IRecordRepository recordRepository,
                IMapper mapper,
                IUserRepository repository
            )
        {
            _appSettings = appSettings.Value;
            _repository = repository;
            _mapper = mapper;
            _recordRepository = recordRepository;
        }

        public UserDTO Authenticate(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var usrToken = tokenHandler.WriteToken(token);

            var userDto = _mapper.Map<UserDTO>(user);
            userDto.Token = "Bearer " + usrToken;

            return userDto;
        }

        public UserDTO? GetCurrentUser(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            if (tokenHandler.ReadToken(token) is JwtSecurityToken jwtToken)
            {
                var username = jwtToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;
                var role = jwtToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value;

                if (!string.IsNullOrEmpty(username))
                {
                    var userDto = new UserDTO
                    {
                        Username = username,
                        Token = token
                    };

                    return userDto;
                }
            }
            return null;
        }

        public UserDTO GetByUsername(string username)
        {
            var user = _repository.GetByUsername(username);
            var userDto = _mapper.Map<UserDTO>(user);

            return userDto;
        }

        public UserDTO? Login(UserRequestDTO userParam)
        {
            var user = _repository.GetByUsername(userParam.Username);

            if(user == null || !BCrypt.Net.BCrypt.Verify(userParam.Password, user.Password)){
                return null;
            }

            var auth = Authenticate(user);

            return auth;
        }

        public User Registration(UserRegistrationDTO userParam)
        {
            var user = new User{
                Role = UserRoles.User,
                Username = userParam.Username,
                Name = userParam.Name,
                Password = BCrypt.Net.BCrypt.HashPassword(userParam.Password)
            };

            var createdUser = _repository.Create(user);

            return createdUser;
            
        }
        public User AdminRegistration(UserRegistrationDTO userParam)
        {
            var user = new User{
                Role = UserRoles.Admin,
                Username = userParam.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(userParam.Password)
            };

            var createdUser = _repository.Create(user);

            return createdUser;
            
        }

        public List<RecordDTO> GetUserRecords(string username)
        {
            
            var records = _recordRepository.GetByCPF(username);
            var recordsDTO = _mapper.Map<List<RecordDTO>>(records);

            return recordsDTO;
        }

        public RecordDTO GetUserRecordsDetail(string username, int recordId)
        {
            
            var record = _recordRepository.GetByUserAndRecord(username, recordId);
            var recordDTO = _mapper.Map<RecordDTO>(record);

            return recordDTO;
        }

        public UserDTO GetCurrentUserProfile(string username)
        {
            var user = _repository.GetByUsername(username);
            var profile = _mapper.Map<UserDTO>(user);

            return profile;

        }

        public UserDTO Update(UserDTO dto)
        {
            var user = _mapper.Map<User>(dto);
            var updated = _repository.Update(user);

            return _mapper.Map<UserDTO>(updated);
        }

        public UserDTO SaveUserFile(string filename, string username)
        {
            var user = _repository.SaveUserFile(filename, username);
            var userDto = _mapper.Map<UserDTO>(user);

            return userDto;
        }

        public UserDTO RemoveUserFile(string username)
        {
            var user = _repository.RemoveUserFile(username);
            var userDto = _mapper.Map<UserDTO>(user);

            return userDto;
        }
        
    }
}