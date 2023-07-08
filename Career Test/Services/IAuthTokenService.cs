using Career_Test.Dtos;

namespace Career_Test.Services
{
    public interface IAuthTokenService
    {
        Task<LoginResponseDto> Login(LoginDto model);
        //Task<LoginResponseDto> Register(RegisterDto model);
        Task<bool> AppendInfo(AppendInfoDto dto);

		Task DecodeToken(string token);
    }
}
