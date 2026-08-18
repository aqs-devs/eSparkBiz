#

https://chatgpt.com/s/t_6a83d665fea88191a8900880ee9733a3

## URL

- Applicant

    ```md
    /dashboard
    /my-profile
    /my-application
    /my-application/education
    /my-application/experience
    ```

- Recruiter

    ```md
    /Admin
    /admin/applicants
    /admin/applicants/:id
    /admin/users
    ```

## Database

```md
users
────────────────────────
id
email
email_verified_at
password_hash
status
created_at
updated_at
```

Then perhaps:

```md
user_identities
────────────────────────
id
user_id
provider
provider_subject
created_at
```

This becomes useful if you later support: Email/password, Google, GitHub, Microsoft, SSO, etc.
Instead of designing your users table around only: email + password

---

Then:

```md
applicants
────────────────────────
id
user_id NULL
...
created_at
updated_at
```

The user_id relationship is the important part.

```text
But don't necessarily make user_id mandatory

This is particularly relevant to your current application.

Your existing recruiter/admin workflow might create an applicant manually:

Recruiter → Create Applicant

That applicant might not have an account yet.

Therefore:

applicants.user_id

could initially be:

NULL

Example:

Applicant #47
user_id = NULL
name = Rahul Sharma
email = rahul@example.com

Later Rahul signs up:

User #182
email = rahul@example.com

You can associate:

Applicant #47
        │
        └──── user_id = 182

That gives you two valid creation paths:

                    ┌── Recruiter creates applicant
                    │
                    ▼
              Applicant
                    ▲
                    │
                    │ associated later
                    │
              User signs up

This is substantially more flexible than:

User
  ↓
Email verified
  ↓
Applicant
```

---

```text
User/account domain
    email
    emailVerifiedAt
    passwordHash
    accountStatus
Person/profile domain
    firstName
    lastName
    phone
    dateOfBirth
    address
Applicant domain
    designation
    education
    experience
    technologies
    resume
    applicationStatus
```