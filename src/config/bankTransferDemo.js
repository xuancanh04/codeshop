/** Demo bank transfer info for checkout UI (not real production data). */
export const bankTransferDemo = {
  bankName: 'Demo Bank',
  accountNumber: '0000000000',
  accountHolder: 'CodeHub Demo',
  /** Shown as contact hint after “transfer” (like Zalo on D2-style sites). */
  supportNote: 'support@codehub.demo',
}

/** VietQR-style payload fragment for QR image API (informational only). */
export function buildBankQrDataUrl(accountNumber, amountUsd) {
  const text = encodeURIComponent(`BANK:${accountNumber}|AMOUNT:${amountUsd}|DEMO`)
  return `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=1&data=${text}`
}
