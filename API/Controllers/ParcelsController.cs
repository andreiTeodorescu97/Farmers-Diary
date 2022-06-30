using Application.DTOs.AppliedFertilizers;
using Application.DTOs.Farm;
using Application.Farm.AppliedFertilizersRepository;
using Application.Farm.ParcelsRepository;
using AutoMapper;
using Domain.DataContext;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ParcelsController : BaseApiController
    {
        private readonly IParcelsRepository _parcelsRepository;
        private readonly IAppliedFertilizersRepository _appliedFertilizersRepository;

        public ParcelsController(JFContext context, IMapper mapper, 
            IParcelsRepository parcelsRepository,
            IAppliedFertilizersRepository appliedFertilizersRepository) : base(context, mapper)
        {
            _parcelsRepository = parcelsRepository;
            _appliedFertilizersRepository = appliedFertilizersRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<GetParcelDTO>> GetParcelsForUser()
        {
            var userId = User.GetUserId();
            var result = await _parcelsRepository.GetParcelsForUser(userId);
            return result;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddParcel(AddParcelDTO request)
        {
            var userId = User.GetUserId();
            request.AppUserId = userId;
            await _parcelsRepository.AddParcel(request);
            return Ok();
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> EditParcel(EditParcelDTO request)
        {
            var userId = User.GetUserId();
            if (!_parcelsRepository.CheckUserParcelCombination(userId, request.Id))
            {
                return BadRequest("Id-ul de parcela este invalid sau nu apartine user-ului!");
            }
            request.AppUserId = userId;
            await _parcelsRepository.EditParcel(request);
            return Ok();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteParcel(int id)
        {
            var userId = User.GetUserId();
            if (!_parcelsRepository.CheckUserParcelCombination(userId, id))
            {
                return BadRequest("Id-ul de parcela este invalid sau nu apartine user-ului!");
            }
            await _parcelsRepository.DeleteParcel(id);
            return Ok();
        }

        [HttpPost("applyFertilizer")]
        [Authorize]
        public async Task<IActionResult> ApplyFertilizer(AddFertilizerDTO request)
        {
            await _appliedFertilizersRepository.AddFertilizer(request);
            return Ok();
        }

        [HttpGet("getFertilizers")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<GetFertilizerDTO>>> GetFertilizers()
        {
            var result = await _appliedFertilizersRepository.GetAppliedFertilizers(User.GetUserId());
            return Ok(result);
        }

        [HttpGet]
        [Route("print")]
        public async Task<IActionResult> PrintFertilizersRegistry()
        {
            return await _appliedFertilizersRepository.PrintFertilizersRegistry(User.GetUserId());
        }
    }
}
