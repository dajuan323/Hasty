using Sabio.Models;
using Sabio.Models.Domain.CivilianProfiles;
using Sabio.Models.Domain.MilitaryProfile;
using Sabio.Models.Requests.CivilianProfiles;

namespace Sabio.Services.Interfaces
{
    public interface ICivilianProfileService
    {
        int Add(CivilianProfileAddRequest model, int userId);
        void Delete(int id);
        CivilianProfile GetById(int id);
        Paged<CivilianProfile> GetPaged(int pageIndex, int pageSize);
        Paged<CivilianProfile> SearchPaginated(int pageIndex, int pageSize, string query);
        void Update(CivilianProfileUpdateRequest model, int userId);
    }
}