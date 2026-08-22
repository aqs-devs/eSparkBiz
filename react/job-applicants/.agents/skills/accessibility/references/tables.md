# Tables

Use semantic HTML tables for genuinely tabular data.

Do not turn a data table into an ARIA `grid` unless the interface requires
grid-specific interaction.

## Data table semantics

Use:

- `<table>` for the table;
- `<thead>` for column headers;
- `<tbody>` for data rows;
- `<tr>` for rows;
- `<th>` for headers;
- `<td>` for data cells.

Column headers should use:

```html
<th scope="col">Name</th>
