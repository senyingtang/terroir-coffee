const items = [
  'Ethiopia',
  'Colombia',
  'Taiwan',
  'Direct Trade',
  'Small Batch',
  'Hand Roasted',
  'Taipei',
  'Est. 2019',
]

const track = [...items, ...items]

export default function MarqueeStrip() {
  return (
    <div
      className="overflow-hidden py-5 select-none"
      style={{ backgroundColor: 'var(--text)' }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee 24s linear infinite' }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="shrink-0 font-[family-name:var(--font-cormorant)] italic"
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: i % 2 === 0 ? 'var(--bg)' : 'var(--taupe)',
              padding: '0 2.5rem',
            }}
          >
            {item}
            <span className="ml-10" style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
