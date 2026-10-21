<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Dashboard data goes through `src/lib/mizan-store.ts` (browser localStorage only); replace that module with API calls to connect a real backend, so pages need no changes.
- Dashboard pages live under `src/routes/dashboard.*.tsx` inside the `AppShell` layout and use the shared pieces in `src/components/mizan/ui.tsx` for consistency.
