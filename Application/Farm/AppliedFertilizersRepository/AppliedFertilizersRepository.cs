using Application.DTOs.AppliedFertilizers;
using Application.Helpers;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DataContext;
using Domain.Entities;
using iText.IO.Image;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout.Borders;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Farm.AppliedFertilizersRepository
{
    public class AppliedFertilizersRepository : IAppliedFertilizersRepository
    {
        private readonly JFContext _context;
        private readonly IMapper _mapper;

        public AppliedFertilizersRepository(JFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddFertilizer(AddFertilizerDTO fertilizerDTO)
        {
            var fertilizer = _mapper.Map<AppliedFertilizer>(fertilizerDTO);
            _context.AppliedFertilizers.Add(fertilizer);

            await SaveAllAsync();
        }

        public async Task<IEnumerable<GetFertilizerDTO>> GetAppliedFertilizers(int userId)
        {
            return await _context.AppliedFertilizers.Where(c => c.Parcel.AppUserId == userId)
                .ProjectTo<GetFertilizerDTO>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<IActionResult> PrintFertilizersRegistry(int userId)
        {
            var fertilizers = await GetAppliedFertilizers(userId);

            //Initialize document
            var memoryStream = new MemoryStream();
            var pdfWriter = new PdfWriter(memoryStream);
            var pdfDocument = new PdfDocument(pdfWriter);
            var document = new iText.Layout.Document(pdfDocument, PageSize.A4.Rotate(), false);
            pdfWriter.SetCloseStream(false);

            await CreateDocumentContentAsync(document, fertilizers.ToList(), userId);

            //Add page numbers
            int numberOfPages = pdfDocument.GetNumberOfPages();
            document.AddPageNumbers(numberOfPages);
            document.Close();

            var byteInfo = memoryStream.ToArray();
            memoryStream.Write(byteInfo, 0, byteInfo.Length);
            memoryStream.Position = 0;

            FileStreamResult fileStream = new FileStreamResult(memoryStream, "application/pdf")
            {
                FileDownloadName = $"{DateTime.Now:dd/MM/yyyy}"
            };

            return fileStream;
        }

        private async Task CreateDocumentContentAsync(iText.Layout.Document document, List<GetFertilizerDTO> fertilizers, int userId)
        {
            var table = new Table(UnitValue.CreatePercentArray(11));

            //Add page headers
            var pageHeaderParagraphs = await GetHeaderParagraphsAsync(userId);
            foreach (var item in pageHeaderParagraphs)
            {
                var pageHearderCell = new Cell(1, 11).Add(item);
                pageHearderCell.SetBorder(Border.NO_BORDER);
                table.AddHeaderCell(pageHearderCell);
            }

            //Add table headers
            string[] headers = {"Bloc fizic", "Numar parcela", "Suprafata parcela", "Cultura", "Planificat N (kg s.a./ha)",
                    "Ingrasamant", "Tip", "kg N s.a./ha", "Data aplicarii",  "Total N (kg s.a./ha)", "Observatii" };

            foreach (var header in headers)
            {
                table.AddTableHeaderCell(header);
            }

            //Add table content
            foreach (var item in fertilizers)
            {
                table.AddTableCell($"{item.Parcel.PhysicalBlock}");
                table.AddTableCell($"{item.Parcel.Name}");
                table.AddTableCell($"{item.Parcel.Surface}");
                table.AddTableCell($"{item.Parcel.CultureName}");
                table.AddTableCell($"{item.Planned}");
                table.AddTableCell($"{item.FetilizerType}");
                table.AddTableCell($"{item.Type}");
                table.AddTableCell($"{item.AppliedWeightPerHa}");
                table.AddTableCell($"{item.DateApplied:dd/MM/yyyy}");
                table.AddTableCell($"{item.AppliedWeightPerHa}");
                table.AddTableCell($"{item.Observations}");
            }

            document.Add(table);
        }

        private async Task<List<Paragraph>> GetHeaderParagraphsAsync(int userId)
        {
            var border = new SolidBorder(1);
            var paragraphs = new List<Paragraph>();

            var user = await _context.Users.FindAsync(userId);

            paragraphs.Add(new Paragraph("Fermier:")
                .SetTextAlignment(TextAlignment.LEFT)
                .SetFontSize(10));

            paragraphs.Add(new Paragraph($"{user.Name} {user.LastName}")
                .SetTextAlignment(TextAlignment.LEFT)
                .SetBorderBottom(border)
                .SetBold()
                .SetFontSize(10));

            return paragraphs;
        }

        private async Task SaveAllAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
