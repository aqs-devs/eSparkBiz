# CRUD Workflow

## List

Every resource list must account for:

- Loading
- Empty
- Error
- Pagination
- Filtering
- Sorting
- View
- Edit
- Delete

### Mutations

Every destructive mutation must account for:

- Pending state
- Duplicate-action prevention
- Success feedback
- Failure feedback

If deletion is reversible, provide Undo.

## Create / Edit

Every form must account for:

- Initial state
- Validation
- Submission
- Pending state
- Duplicate-submit prevention
- Success feedback
- Failure feedback
- Success navigation
- Back / Cancel
- Unsaved-change protection

## Detail

Every detail page must account for:

- Loading
- Not-found
- Error
- Navigation
- Edit
- Delete
