import { Link } from 'react-router-dom'
import { useI18n } from '../context/I18nContext'
import BrandLogo from './BrandLogo'
import { contactChannels } from '../config/contactChannels'

function FooterListLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-neutral-300 transition hover:text-white hover:underline dark:text-neutral-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  )
}

function FooterListMuted({ children }) {
  return <li className="text-neutral-300 dark:text-neutral-400">{children}</li>
}

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-neutral-200 dark:border-zinc-800">
      <section className="bg-[#333333] py-10 text-white dark:bg-zinc-950">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:gap-8 lg:px-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-white">{t('footer.colBuyers')}</h3>
            <ul className="mt-4 list-none space-y-2.5 text-sm">
              <FooterListLink to="/contact">{t('footer.buyer1')}</FooterListLink>
              <FooterListLink to="/contact">{t('footer.buyer2')}</FooterListLink>
              <FooterListLink to="/contact">{t('footer.buyer3')}</FooterListLink>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-white">{t('footer.colSellers')}</h3>
            <ul className="mt-4 list-none space-y-2.5 text-sm">
              <FooterListLink to="/legal/terms">{t('footer.seller1')}</FooterListLink>
              <FooterListLink to="/contact">{t('footer.seller2')}</FooterListLink>
              <FooterListMuted>{t('footer.seller3')}</FooterListMuted>
              <FooterListLink to="/contact">{t('footer.seller4')}</FooterListLink>
              <FooterListMuted>{t('footer.seller5')}</FooterListMuted>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-white">{t('footer.colServices')}</h3>
            <ul className="mt-4 list-none space-y-2.5 text-sm">
              <FooterListMuted>{t('footer.service1')}</FooterListMuted>
              <FooterListMuted>{t('footer.service2')}</FooterListMuted>
              <FooterListMuted>{t('footer.service3')}</FooterListMuted>
              <FooterListMuted>{t('footer.service4')}</FooterListMuted>
              <FooterListMuted>{t('footer.service5')}</FooterListMuted>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-white">{t('footer.communityTitle')}</h3>
            <div className="mt-3 flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877f2] text-white transition hover:opacity-90"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff0000] text-white transition hover:opacity-90"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-wide text-white">{t('footer.deposit247Title')}</p>
              <p className="mt-2 text-sm text-neutral-300 dark:text-neutral-400">{t('footer.deposit247Sub')}</p>
            </div>
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wide text-white">{t('footer.supportTeamTitle')}</p>
              <p className="mt-2 text-sm text-neutral-300 dark:text-neutral-400">{t('footer.supportTeamHours')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-[#f5f5f5] dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <BrandLogo
              size="sm"
              className="shrink-0 self-start rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5] dark:focus-visible:ring-offset-zinc-900"
            />

            <div className="flex min-w-0 flex-1 flex-col items-center gap-3 text-center text-sm text-neutral-700 lg:px-4 dark:text-neutral-300">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                <Link to="/contact" className="hover:text-blue-700 hover:underline dark:hover:text-blue-400">
                  {t('footer.bottomIntro')}
                </Link>
                <span className="text-neutral-400" aria-hidden>
                  |
                </span>
                <Link to="/legal/terms" className="hover:text-blue-700 hover:underline dark:hover:text-blue-400">
                  {t('footer.bottomRules')}
                </Link>
                <span className="text-neutral-400" aria-hidden>
                  |
                </span>
                <span className="cursor-default text-neutral-500 dark:text-neutral-500">{t('footer.bottomEvents')}</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                <span className="font-medium text-neutral-800 dark:text-neutral-200">{t('footer.hotlinePrefix')}</span>{' '}
                <a
                  href={`tel:${contactChannels.phoneTel}`}
                  className="whitespace-nowrap hover:text-blue-700 hover:underline dark:hover:text-blue-400"
                >
                  {contactChannels.phoneDisplay}
                </a>
                <span className="mx-2 text-neutral-300 dark:text-neutral-600" aria-hidden>
                  –
                </span>
                <span className="font-medium text-neutral-800 dark:text-neutral-200">{t('footer.emailPrefix')}</span>{' '}
                <a
                  href={`mailto:${contactChannels.supportEmail}`}
                  className="break-all hover:text-blue-700 hover:underline dark:hover:text-blue-400"
                >
                  {contactChannels.supportEmail}
                </a>
              </p>
              <Link
                to="/legal/privacy"
                className="text-sm text-neutral-600 hover:text-blue-700 hover:underline dark:text-neutral-400 dark:hover:text-blue-400"
              >
                {t('footer.privacy')}
              </Link>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-2 lg:items-end lg:text-right">
              <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                {t('footer.copyrightLine', { year })}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-500">{t('footer.protectedLine')}</p>
              <div
                className="inline-flex items-center gap-1 rounded border-2 border-green-600 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-green-700 dark:border-green-500 dark:bg-green-950/40 dark:text-green-400"
                title="Demo badge"
              >
                <svg className="h-3.5 w-3.5 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
                {t('footer.dmcaBadge')}
              </div>
            </div>
          </div>

          <p className="mt-6 border-t border-neutral-200 pt-5 text-center text-[11px] text-neutral-400 dark:border-zinc-700 dark:text-neutral-600">
            {t('footer.demoNote')}
          </p>
        </div>
      </section>
    </footer>
  )
}
