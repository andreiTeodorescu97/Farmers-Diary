using iText.Kernel.Geom;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using System;

namespace Application.Helpers
{
    public static class iTextExtensions
    {
        public static void AddTableEmptyCells(this Table table, int numberOfCells)
        {
            for (int i = 0; i < numberOfCells; i++)
            {
                table.AddCell(new Cell(1, 1).Add(new Paragraph("")));
            }
        }

        public static void AddTableCell(this Table table, string content, int fontSize = 9, bool isBold = false)
        {
            var cell = new Cell(1, 1)
                .Add(new Paragraph(content))
                .SetTextAlignment(TextAlignment.CENTER)
                .SetFontSize((float)fontSize)
                .SetKeepTogether(true);

            cell = isBold ? cell.SetBold() : cell;

            table.AddCell(cell);
        }

        public static void AddTableHeaderCell(this Table table, string content)
        {
            table.AddHeaderCell(new Cell(1, 1)
                .Add(new Paragraph(content))
                .SetTextAlignment(TextAlignment.CENTER)
                .SetFontSize(10)
                .SetKeepTogether(true));
        }

        public static void AddPageNumbers(this Document document, int numberOfPages)
        {
            for (int i = 0; i < numberOfPages; i++)
            {
                document.ShowTextAligned(new Paragraph(String.Format($"{i + 1}/{numberOfPages}")).SetFontSize(8),
                    PageSize.A4.GetHeight() / 2, 20, i + 1,
                    TextAlignment.RIGHT, VerticalAlignment.BOTTOM, 0);
            }
        }
    }
}
