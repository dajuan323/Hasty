
public class CivilianProfileService : ICivilianProfileService
{
    IDataProvider _data = null;
    static IBaseUserMapper _baseUserMapper = null;
    public CivilianProfileService(IDataProvider data, IBaseUserMapper baseUserMapper)
    {
        _data = data;
        _baseUserMapper = baseUserMapper;
    }

    public Paged<CivilianProfile> GetPaged(int pageIndex, int pageSize)
    {
        Paged<CivilianProfile> pagedResult = null;
        List<CivilianProfile> result = null;
        int totalCount = 0;

        _data.ExecuteCmd(
            "dbo.CivilianProfiles_SelectAll",
            inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                CivilianProfile civiProfile = null;
                int startingIndex = 0;

                civiProfile = MapSingleProfile(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (result == null)
                {
                    result = new List<CivilianProfile>();
                }

                result.Add(civiProfile);
            }
        );

        if (result != null)
        {
            pagedResult = new Paged<CivilianProfile>(result, pageIndex, pageSize, totalCount);
        }
        return pagedResult;
    }

    public Paged<CivilianProfile> SearchPaginated(int pageIndex, int pageSize, string query)
    {
        Paged<CivilianProfile> pagedResult = null;
        List<CivilianProfile> result = null;
        int totalCount = 0;
        _data.ExecuteCmd(
           "dbo.CivilianProfiles_SearchPaginated",
           inputParamMapper: delegate (SqlParameterCollection parameterCollection)
           {
               parameterCollection.AddWithValue("@PageIndex", pageIndex);
               parameterCollection.AddWithValue("@PageSize", pageSize);
               parameterCollection.AddWithValue("@Query", query);
           },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                CivilianProfile civiProfile = null;
                int startingIndex = 0;

                civiProfile = MapSingleProfile(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }

                if (result == null)
                {
                    result = new List<CivilianProfile>();
                }

                result.Add(civiProfile);
            }
        );

        if (result != null)
        {
            pagedResult = new Paged<CivilianProfile>(result, pageIndex, pageSize, totalCount);
        }
        return pagedResult;
    }
    public CivilianProfile GetById(int id)
    {
        string procName = "[dbo].[CivilianProfiles_SelectById]";
        CivilianProfile profile = null;
        _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
        {
            paramCollection.AddWithValue("@Id", id);
        }, singleRecordMapper: delegate (IDataReader reader, short set)
        {
            int startingIndex = 0;
            profile = MapSingleProfile(reader, ref startingIndex);
        });
        return profile;
    }

    public int Add(CivilianProfileAddRequest model, int userId)
    {
        int id = 0;
        string procName = "[dbo].[CivilianProfiles_Insert]";
        _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
        {
            AddCommonParams(model,col, userId);
            SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
            idOut.Direction = ParameterDirection.Output;
            col.Add(idOut);

        }, returnParameters: delegate (SqlParameterCollection returnCol)
        {
            object oId = returnCol["@Id"].Value;
            int.TryParse(oId.ToString(), out id);
        });
        return id;
    }

    public void Update(CivilianProfileUpdateRequest model, int userId)
    {
        string procName = "[dbo].[CivilianProfiles_Update]";
        _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
        {
            AddCommonParams(model, col, userId);
            col.AddWithValue("@Id", model.Id);


        });
    }

    public void Delete(int id)
    {
        string procName = "[dbo].[CivilianProfiles_Delete]";

        _data.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            });
    }


    private static CivilianProfile MapSingleProfile(IDataReader reader, ref int startingIndex)
    {

        CivilianProfile civiProfile = new CivilianProfile();

        civiProfile.Id = reader.GetSafeInt32(startingIndex++);
        civiProfile.User = _baseUserMapper.MapBaseUser(reader, ref startingIndex);
        civiProfile.MonthlyIncome = reader.GetSafeInt32(startingIndex++);
        civiProfile.MoveInDate = reader.GetSafeDateTime(startingIndex++);
        civiProfile.DateModified = reader.GetSafeDateTime(startingIndex++);
        

        return civiProfile;
    }

    private static void AddCommonParams(CivilianProfileAddRequest model,SqlParameterCollection col, int userId )
    {
        col.AddWithValue("@MonthlyIncome", model.MonthlyIncome);
        col.AddWithValue("@MoveInDate", model.MoveInDate);
        col.AddWithValue("@UserId", userId);
    }
}

