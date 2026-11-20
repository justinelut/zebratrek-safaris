# CMS content snapshot

A JSON copy of every public content table in the Payload database (one file per table, rows as stored). It exists so the site's content survives if the hosted Postgres (Supabase) is paused or deleted.

Not included: users, sessions, admin preferences, enquiries, bookings and other submissions. Those are in the private full SQL dump kept on the Oracle server at `~/backups/<site>/<date>/` (restore it with `gunzip -c <file>.sql.gz | psql "$DATABASE_URL"`).

Refresh: `~/backups/scripts/export-cms-db.sh <site> <env-file> <repo-dir>` on the server, then commit.
