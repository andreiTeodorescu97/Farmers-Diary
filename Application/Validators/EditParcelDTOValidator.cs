using Application.DTOs.Farm;
using Domain.DataContext;
using FluentValidation;
using System.Linq;

namespace Application.Validators
{
    public class EditParcelDTOValidator : AbstractValidator<EditParcelDTO>
    {
        private readonly JFContext _context;

        public EditParcelDTOValidator(JFContext context)
        {
            _context = context;

            RuleFor(p => p.Id)
                .NotNull()
                .WithMessage("Id-ul parcelei este obligatoriu!");

            RuleFor(p => p.Id)
                .GreaterThan(0)
                .WithMessage("Id-ul de parcela este invalid!")
                .Custom((r, ctx) =>
                {
                    if (!_context.Parcels.Any(c => c.Id == r))
                    {
                        ctx.AddFailure("Id-ul de parcela nu exista in baza de date!");
                    }
                });

            RuleFor(p => p.Name)
                .NotNull()
                .WithMessage("Denumirea parcelei este obligatorie!");

            RuleFor(p => p.Name)
                .NotEmpty()
                .WithMessage("Denumirea parcelei este obligatorie!");

            RuleFor(p => p.Surface)
                .GreaterThan(0)
                .WithMessage("Suprafata parcelei nu poate fi zero!");

            RuleFor(p => p.CountyId)
                .GreaterThan(0)
                .WithMessage("Id-ul de judet este invalid!")
                .Custom((r, ctx) =>
                {
                    if (!_context.Counties.Any(c => c.Id == r))
                    {
                        ctx.AddFailure("Id-ul de judet nu exista in baza de date!");
                    }
                });

            RuleFor(p => p.CultureId)
                .GreaterThan(0)
                .WithMessage("Id-ul de cultura este invalid!")
                .Custom((r, ctx) =>
                {
                    if (!_context.Cultures.Any(c => c.Id == r))
                    {
                        ctx.AddFailure("Id-ul de cultura nu exista in baza de date!");
                    }
                });
        }
    }
}
