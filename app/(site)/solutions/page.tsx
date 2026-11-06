import CTABanner from "@/components/ui/CTABanner";
import CheckList from "@/components/ui/CheckList";
import Container from "@/components/ui/Container";
import IconBox, { Icon } from "@/components/ui/IconBox";
import PageHero from "@/components/ui/PageHero";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import FramedImage from "@/components/visuals/FramedImage";
import { getSolutionsContent } from "@/lib/api/content";

/** Each solution shows the product photo that matches its story (from the Gallery set). */
const imageFor: Record<string, { src: string; width: number; height: number }> = {
  "multi-site-programs": { src: "/images/gallery/Industries.png", width: 1672, height: 941 },
  "contractor-vendor-access": { src: "/images/gallery/host-approvals.png", width: 1448, height: 1086 },
  "front-desk-operations": { src: "/images/gallery/Access-Badge.png", width: 1448, height: 1086 },
};

const fallbackImage = imageFor["front-desk-operations"];

type SolutionRow = Awaited<ReturnType<typeof getSolutionsContent>>["rows"][number];

/** Hero aside: a lobby directory board that jumps to each solution below. */
function Directory({ rows }: { rows: SolutionRow[] }) {
  return (
    <div className="arch-soft relative mx-auto max-w-md border border-linen/15 bg-spruce-2 px-6 pb-6 pt-12 shadow-[var(--shadow-offset-dark)] sm:px-8">
      <span aria-hidden="true" className="absolute left-1/2 top-5 h-1.5 w-10 -translate-x-1/2 rounded-full bg-black/40" />
      <ul className="divide-y divide-linen/10">
        {rows.map((row) => (
          <li key={row.imageSlug}>
            <a href={`#${row.imageSlug}`} className="group flex items-end gap-3 py-4">
              <span className="min-w-0">
                <span className="block font-display text-sm italic text-clay-light">{row.eyebrow}</span>
                <span className="mt-1 block font-display text-xl leading-tight text-linen">{row.title}</span>
              </span>
              <span aria-hidden="true" className="mb-2 h-px min-w-6 flex-1 border-b border-dotted border-linen/30" />
              <Icon
                icon="arrow-down"
                className="mb-1 h-5 w-5 shrink-0 text-clay-light transition-transform duration-200 group-hover:translate-y-1"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function SolutionsPage() {
  const content = await getSolutionsContent();
  const [multiSite, contractor, frontDesk, ...extraRows] = content.rows;

  const photo = (row: SolutionRow) => imageFor[row.imageSlug] ?? fallbackImage;

  return (
    <>
      <PageHero {...content.hero} aside={<Directory rows={content.rows} />} />

      {/* 1 · Multi-site: wide heading row, then the network photo centred below */}
      {multiSite ? (
        <Section tone="linen" id={multiSite.imageSlug} aria-labelledby={`${multiSite.imageSlug}-title`}>
          <Container>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <SectionHeading
                id={`${multiSite.imageSlug}-title`}
                eyebrow={multiSite.eyebrow}
                title={multiSite.title}
                description={multiSite.description}
                tone="light"
                className="lg:col-span-7"
              />
              <div className="border-l-2 border-brass pl-6 lg:col-span-4 lg:col-start-9">
                <CheckList items={multiSite.checklist} tone="light" />
              </div>
            </div>
            <FramedImage
              src={photo(multiSite).src}
              alt={multiSite.imageAlt}
              width={photo(multiSite).width}
              height={photo(multiSite).height}
              shape="soft"
              sizes="(min-width: 1024px) 768px, 92vw"
              className="mx-auto mt-14 max-w-3xl lg:mt-20"
            />
          </Container>
        </Section>
      ) : null}

      {/* 2 · Contractor & vendor: photo with the checklist issued as a pass */}
      {contractor ? (
        <Section tone="dark-1" spacing="loose" id={contractor.imageSlug} aria-labelledby={`${contractor.imageSlug}-title`}>
          <Container>
            <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6 lg:col-start-7">
                <SectionHeading
                  id={`${contractor.imageSlug}-title`}
                  eyebrow={contractor.eyebrow}
                  title={contractor.title}
                  description={contractor.description}
                />
              </div>
              <div className="lg:order-first lg:col-span-5">
                <div className="relative mx-auto max-w-sm lg:mx-0">
                  <FramedImage
                    src={photo(contractor).src}
                    alt={contractor.imageAlt}
                    width={photo(contractor).width}
                    height={photo(contractor).height}
                    shape="soft"
                    className="border-linen/10 shadow-[var(--shadow-offset-dark)]"
                    sizes="(min-width: 640px) 384px, 92vw"
                  />
                  {/* The checklist, issued as a visitor pass */}
                  <div className="notch relative mx-4 -mt-10 rotate-2 rounded-xl border border-spruce/10 bg-paper px-5 pb-5 pt-8 text-spruce shadow-[var(--shadow-offset-dark)] [--notch-bg:#072b36] sm:mx-0 sm:ml-auto sm:w-72 lg:absolute lg:-bottom-12 lg:-right-24 lg:mt-0">
                    <p className="font-display text-sm italic text-clay">{contractor.eyebrow}</p>
                    <div className="mt-3 border-t border-dashed border-spruce/20 pt-4">
                      <CheckList items={contractor.checklist} tone="light" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* 3 · Front desk: copy and ruled checklist left, the welcome photo in a doorway right */}
      {frontDesk ? (
        <Section tone="light-2" className="overflow-hidden" id={frontDesk.imageSlug} aria-labelledby={`${frontDesk.imageSlug}-title`}>
          <Container>
            <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <SectionHeading
                  id={`${frontDesk.imageSlug}-title`}
                  eyebrow={frontDesk.eyebrow}
                  title={frontDesk.title}
                  description={frontDesk.description}
                  tone="light"
                />
                <ul className="mt-10 border-t border-spruce/15">
                  {frontDesk.checklist.map((item) => (
                    <li key={item} className="flex items-center gap-4 border-b border-spruce/15 py-4 text-body text-spruce">
                      <Icon icon="check" className="h-5 w-5 shrink-0 text-clay" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <div className="relative mx-auto max-w-xs sm:max-w-sm">
                  <div aria-hidden="true" className="arch absolute -inset-4 border border-clay/40" />
                  <FramedImage
                    src={photo(frontDesk).src}
                    alt={frontDesk.imageAlt}
                    width={photo(frontDesk).width}
                    height={photo(frontDesk).height}
                    shape="arch"
                    sizes="(min-width: 640px) 384px, 320px"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-4 -left-4 -rotate-3 rounded-md bg-clay px-3 py-1.5 font-display text-sm italic text-linen shadow-[var(--shadow-offset-sm)]"
                  >
                    {frontDesk.eyebrow}
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Any further rows fall back to a simple split */}
      {extraRows.map((row) => (
        <Section key={row.imageSlug} tone="linen" id={row.imageSlug}>
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <SectionHeading eyebrow={row.eyebrow} title={row.title} description={row.description} tone="light" />
                <div className="mt-8">
                  <CheckList items={row.checklist} tone="light" />
                </div>
              </div>
              <FramedImage
                src={photo(row).src}
                alt={row.imageAlt}
                width={photo(row).width}
                height={photo(row).height}
                sizes="(min-width: 640px) 448px, 92vw"
                className="mx-auto max-w-md"
              />
            </div>
          </Container>
        </Section>
      ))}

      {/* Outcomes: three staggered columns on brass rules */}
      <Section tone="linen" aria-labelledby="outcomes-title">
        <Container>
          <SectionHeading id="outcomes-title" eyebrow={content.outcomes.eyebrow} title={content.outcomes.title} tone="light" />
          <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8 lg:mt-20">
            {content.outcomes.items.map((item, index) => (
              <li
                key={item.title}
                className={`border-t-2 border-brass pt-6 ${index === 1 ? "md:mt-12" : index === 2 ? "md:mt-24" : ""}`}
              >
                <IconBox icon={item.icon} size="xl" className="text-clay" />
                <h3 className="mt-6 text-h3 text-spruce">{item.title}</h3>
                <p className="mt-2 text-body text-spruce/75">{item.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTABanner
        title={content.cta.title}
        description={content.cta.description}
        primary={{ label: content.cta.primaryLabel, href: content.cta.primaryHref }}
        secondary={{ label: content.cta.secondaryLabel, href: content.cta.secondaryHref }}
        icon={<IconBox icon="arrow-up-right" size="sm" />}
      />
    </>
  );
}
