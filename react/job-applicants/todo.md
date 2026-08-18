#

- [x] add 'shadcn' as table/data-grid: to enable sorting, filtering, searching
- [x] Shared API Contracts
- [x] learn about microservices architecture

- [x] add authentication (stub but it helps imagine the future direction)

    ```md
    modules/
    applicants/
    basic-info/
    education/
    experience/
    technologies/
    ```

    or even

    ```md
    modules/
    applicants/
    controller.ts
    service.ts
    repository.ts

            basic-info/
            education/
            experience/
    ```

    ```md
    server/src/modules/

        applicants/
            router.ts
            controller.ts
            service.ts
            repository.ts

            basic-info/
                mapper.ts
                schema.ts

            education/
                ...

            experience/
                ...

            technologies/
                ...
    ```

    - [ ] modules

    ```md
    modules/

        applicants/
        auth/
        users/
    ```

    ```md
    job-applicants/

    client/
    server/

    packages/
    schemas/
    ui/
    common/

    server/
    modules/

            applicants/
                router.ts
                controller.ts
                service.ts
                repository.ts

                basic-info/
                education/
                experience/
                technologies/

            auth/
                router.ts
                controller.ts
                service.ts

            users/
                ...

    client/
    modules/

            applicants/
                basic-info/
                education/
                experience/
                technologies/

            auth/

            users/
    ```

    ```md
    job-applicants/

    apps/
    web/
    api/

    packages/
    schemas/
    shared/
    ui/
    api-client/

    docs/
    postman/

    Then:

    apps/api/src/modules/
    applicants/
    auth/
    users/

    and

    apps/web/src/modules/
    applicants/
    auth/
    users/
    ```

- [ ] [Implement Tanstack Router and Query](https://chatgpt.com/s/t_6a5f25ef76a48191ab01bf4602ffa561)

- [x] `zodSmartCoersionPlugin`
      this has been CANCELLED due to oRPC lock-in.

- [x] flow of form

    ```md
    User edits applicant
    ↓
    clicks Back
    ↓
    "You have unsaved changes"

    ```

- [ ] Standardization

    - [ ] Form UX

      ```md
      required field indicator
      field error
      server validation error
      disabled state
      submission state
      success handling
      unsaved changes

    - [ ] Security

        ```md
            HTTPS
            secure cookies
            CSRF protection where applicable
            CORS policy
            rate limiting
            input validation
            authorization
            secure headers
            secret management
            SQL injection protection
            XSS protection
            file-upload restrictions if uploads are introduced

    - [ ] server-state strategy

        ```md
            Queries
            Mutations
            Invalidation
            Caching
            Optimistic updates
            Pending state
            Error state

- [ ]  Database constraints
