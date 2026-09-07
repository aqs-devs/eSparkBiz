import { QueryClient } from '@tanstack/react-query';

// Shared application-level client. Feature-specific queries belong in their
// respective modules and should reuse this instance.
export const queryClient = new QueryClient();