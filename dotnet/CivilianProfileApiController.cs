using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Hasty.Models;
using Hasty.Models.Domain.CivilianProfiles;
using Hasty.Models.Requests.CivilianProfiles;
using Hasty.Services;
using Hasty.Services.Interfaces;
using Hasty.Web.Controllers;
using Hasty.Web.Models.Responses;
using System;

namespace Hasty.Web.Api.Controllers
{
    [Route("api/profiles/civilian")]
    [ApiController]
    public class CivilianProfileApiController : BaseApiController
    {
        private ICivilianProfileService _service = null;
        private IAuthenticationService<int> _authService = null;

        public CivilianProfileApiController(ICivilianProfileService service
            , ILogger<CivilianProfileApiController> logger
            , IAuthenticationService<int> authenticationService) : base(logger)
        {
            _service = service;
            _authService = authenticationService;
        }

        [HttpGet]
        public ActionResult<ItemResponse<Paged<CivilianProfile>>> GetPaginated(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<CivilianProfile> page = _service.GetPaged(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Profiles not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<CivilianProfile>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);

        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<CivilianProfile>>> SearchPaged(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<CivilianProfile> page = _service.SearchPaginated(pageIndex, pageSize, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Profiles not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<CivilianProfile>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);

        }


        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<CivilianProfile>> Get(int id)
        {

            int iCode = 200;
            BaseResponse response = null;

            try
            {
                CivilianProfile profile = _service.GetById(id);

                if (profile == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Profile not found");
                }
                else
                {
                    response = new ItemResponse<CivilianProfile> { Item = profile };
                }
            }

            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Errors: ${ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(CivilianProfileAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                IUserAuthData user = _authService.GetCurrentUser();

                int id = _service.Add(model, user.Id);

                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                
                result = StatusCode(201, response);
                
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                
                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(CivilianProfileUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                IUserAuthData user = _authService.GetCurrentUser();
                _service.Update(model,  user.Id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            try
            {
            
                _service.Delete(id);

                SuccessResponse response = new SuccessResponse();

                return Ok(response);

            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                return base.StatusCode(500, new ErrorResponse($"Generic Errors: ${ex.Message}"));
            }
        }

    }
}
