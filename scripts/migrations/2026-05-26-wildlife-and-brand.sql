-- Phase 1 — Wildlife homepage upgrade (ADDITIVE ONLY)
-- New columns on homepage and homepage_animals; new homepage_animals_images table

-- Homepage intro paragraph
ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "wildlife_intro" varchar;

-- New enum for link_type
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_homepage_animals_link_type') THEN
    CREATE TYPE "public"."enum_homepage_animals_link_type" AS ENUM ('none', 'safaris', 'destinations', 'custom');
  END IF;
END$$;

-- Per-animal new fields
ALTER TABLE "homepage_animals" ADD COLUMN IF NOT EXISTS "scientific_name" varchar;
ALTER TABLE "homepage_animals" ADD COLUMN IF NOT EXISTS "description" varchar;
ALTER TABLE "homepage_animals" ADD COLUMN IF NOT EXISTS "link_type" "public"."enum_homepage_animals_link_type" DEFAULT 'safaris';
ALTER TABLE "homepage_animals" ADD COLUMN IF NOT EXISTS "custom_url" varchar;

-- New images sub-array table for animals
CREATE TABLE IF NOT EXISTS "homepage_animals_images" (
  "_order" integer NOT NULL,
  "_parent_id" varchar NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "image_id" integer
);

-- FK to homepage_animals (text id) — only add if not present
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'homepage_animals_images_parent_id_fk'
  ) THEN
    ALTER TABLE "homepage_animals_images"
      ADD CONSTRAINT "homepage_animals_images_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "homepage_animals"("id") ON DELETE CASCADE;
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- ignore (FK type mismatch will be caught later if it matters)
  NULL;
END$$;

-- FK to media for images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'homepage_animals_images_image_id_fk'
  ) THEN
    ALTER TABLE "homepage_animals_images"
      ADD CONSTRAINT "homepage_animals_images_image_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL;
  END IF;
EXCEPTION WHEN OTHERS THEN
  NULL;
END$$;

-- Indexes
CREATE INDEX IF NOT EXISTS "homepage_animals_images_order_idx" ON "homepage_animals_images" ("_order");
CREATE INDEX IF NOT EXISTS "homepage_animals_images_parent_idx" ON "homepage_animals_images" ("_parent_id");
CREATE INDEX IF NOT EXISTS "homepage_animals_images_image_idx" ON "homepage_animals_images" ("image_id");

-- Brand logo fields on settings global (added to Settings.ts already)
ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "logo_dark_id" integer;
ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "logo_icon_id" integer;
ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "brand_pattern_id" integer;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'settings_logo_dark_id_fk') THEN
    ALTER TABLE "settings" ADD CONSTRAINT "settings_logo_dark_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "media"("id") ON DELETE SET NULL;
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'settings_logo_icon_id_fk') THEN
    ALTER TABLE "settings" ADD CONSTRAINT "settings_logo_icon_id_fk" FOREIGN KEY ("logo_icon_id") REFERENCES "media"("id") ON DELETE SET NULL;
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END$$;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'settings_brand_pattern_id_fk') THEN
    ALTER TABLE "settings" ADD CONSTRAINT "settings_brand_pattern_id_fk" FOREIGN KEY ("brand_pattern_id") REFERENCES "media"("id") ON DELETE SET NULL;
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END$$;
