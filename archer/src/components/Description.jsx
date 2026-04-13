export default function Description() {
  return (
    <div
      id="description"
      style={{
        width: '100%',
        maxWidth: 1289,
        position: 'relative',
      }}
    >
      {/* Specs — Material and Dimension only, aligned left */}
      <div style={{ display: 'flex', gap: 120, marginBottom: 60 }}>
        <div>
          <div style={{ color: '#737373', fontSize: 20, fontFamily: 'Arial,sans-serif', fontWeight: 700, marginBottom: 12 }}>Material</div>
          <div style={{ color: '#212121', fontSize: 26, fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: '38px' }}>925 Silver Grain, Jadeite Cabochon</div>
        </div>
        <div>
          <div style={{ color: '#737373', fontSize: 20, fontFamily: 'Arial,sans-serif', fontWeight: 700, marginBottom: 12 }}>Dimension</div>
          <div style={{ color: '#212121', fontSize: 26, fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: '38px' }}>Length 2.3cm, Width 2.7cm</div>
        </div>
      </div>

      {/* Description text */}
      <div style={{ color: '#212121', fontSize: 30, fontFamily: "'Zilla Slab',serif", fontWeight: 400, lineHeight: '48px', letterSpacing: '0.6px', maxWidth: 1100 }}>
        <p style={{ marginBottom: 36 }}>
          This silver jewelry piece is an archer's ring in the style of the Qing Dynasty. Archer ring is an implement of warfare that evolves into items of jewelry. It is meant to be worn on the thumb of the hand that pulls the bowstring. In addition to protecting the thumb, the ring provides a precise release action for the bowstring.
        </p>
        <p style={{ marginBottom: 36 }}>
          The cylindrical thumb ring was popularized by the emperors during the Qing Dynasty, when it evolved into a fashionable accessory, a symbol of status among the wealthy and cultured. The earliest archer's rings were usually made of horn and ivory. But as archer's rings became more embellished and less practical, the materials started to expand greatly.
        </p>
        <p>
          This silver archer's ring consists of three detachable components. Each of them are designed in 3D software, later printed in wax models and lost wax casted. There are concealed threading designs that go around the inner ring band for locking them in place. The ornamentation of the ring is based on floral motifs which referenced largely from that of the Mughal empire in the Middle East and Manchurian culture.
        </p>
      </div>
    </div>
  );
}
