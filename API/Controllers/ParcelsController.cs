using Application.DTOs.Farm;
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

        public ParcelsController(JFContext context, IMapper mapper, IParcelsRepository parcelsRepository) : base(context, mapper)
        {
            _parcelsRepository = parcelsRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IEnumerable<AddParcelDTO>> GetParcelsForUser()
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
            return Ok("Parcela a fost adaugata cu succes!");
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
            return Ok("Parcela a fost editata cu succes!");
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
            return Ok("Parcela a fost stearsa cu succes!");
        }


    }
}
