import React, { useState } from 'react';

const quizData = [
  { question: "Which human activity contributes most to global warming?", options: ["Deforestation", "Using renewable energy", "Recycling"], answer: 0 },
  { question: "What is the greenhouse effect?", options: ["Trapping heat in the Earth's atmosphere", "Cooling the planet", "Growing plants in greenhouses"], answer: 0 },
  { question: "Which of these is a consequence of climate change?", options: ["Stronger storms and hurricanes", "Longer winters everywhere", "More polar bears"], answer: 0 },
  { question: "Which energy source produces the least greenhouse gases?", options: ["Coal", "Solar power", "Oil"], answer: 1 },
  { question: "What is one way to reduce climate change?", options: ["Plant trees", "Cut down forests", "Burn more fossil fuels"], answer: 0 }
];

const stats = [
  { value: '1.1°C', label: 'Average global temperature rise since pre-industrial times', emoji: '🌡️' },
  { value: '8MM', label: 'Metric tons of plastic enter our oceans every year', emoji: '🌊' },
  { value: '75%', label: 'Of global emissions come from burning fossil fuels', emoji: '🏭' },
  { value: '1M+', label: 'Species face extinction due to climate change', emoji: '🐾' },
];

const timeline = [
  { year: '1988', event: 'IPCC (Intergovernmental Panel on Climate Change) is established by the UN.' },
  { year: '1997', event: 'Kyoto Protocol adopted — first binding international emissions treaty.' },
  { year: '2006', event: 'Al Gore\'s "An Inconvenient Truth" brings climate change to mainstream awareness.' },
  { year: '2015', event: 'Paris Agreement signed — 196 countries commit to limit warming to 1.5°C.' },
  { year: '2019', event: 'Greta Thunberg leads the global School Strike for Climate movement.' },
  { year: '2023', event: 'Hottest year ever recorded in human history.' },
];

const goals = [
  { emoji: '📢', title: 'Raise Awareness', desc: 'Make climate science accessible and understandable to everyone.' },
  { emoji: '🤝', title: 'Inspire Action', desc: 'Encourage individuals and communities to adopt sustainable habits.' },
  { emoji: '🔬', title: 'Promote Science', desc: 'Share evidence-based information grounded in peer-reviewed research.' },
  { emoji: '🌱', title: 'Build Hope', desc: 'Show that solutions exist and that change is possible.' },
];

const AboutPage = ({ darkMode = false }) => {
  const dm = !!darkMode;
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSelect = (index) => setSelected(index);

  const handleSubmit = () => {
    if (selected === null) return;
    const correct = selected === quizData[currentQ].answer;
    if (correct) setScore(score + 1);
    setShowResult(true);
    setTimeout(() => {
      if (currentQ < quizData.length - 1) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const optionStyle = (isSelected) => ({
    padding: '1.25rem',
    margin: '0.75rem 0',
    background: isSelected 
      ? (dm ? '#4a6a3a' : '#c1d6c1')
      : (dm ? '#2e3a28' : '#f5f5dc'),
    borderRadius: '12px',
    cursor: 'pointer',
    border: isSelected ? `2px solid ${dm ? '#7a9a7a' : '#9caf88'}` : '2px solid transparent',
    transition: 'all 0.2s ease',
    color: isSelected ? (dm ? '#c1d6c1' : '#3d4a35') : (dm ? '#9ab89a' : '#5c6b52'),
    fontWeight: isSelected ? 500 : 400,
  });

  return (
    <div className="page" style={{ background: dm ? '#2a3424' : '#f2f4ee' }}>
      <div className="container">

        {/* Stats & Facts */}
        <section className="card" style={{ background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}` }}>
          <h2 style={{ color: dm ? '#d0e8d0' : '#5c6b52' }}>Climate Change by the Numbers</h2>
          <p style={{ color: dm ? '#9ab89a' : '#6b7a5f', marginBottom: '1.5rem' }}>Key statistics that show the urgency of the climate crisis.</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}>
            {stats.map((s, idx) => (
              <div key={idx} style={{
                padding: '1.5rem',
                background: dm ? '#2e3a28' : '#f5f5dc',
                borderRadius: '14px',
                textAlign: 'center',
                border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}`,
              }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{s.emoji}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: dm ? '#c1d6c1' : '#5c6b52', marginBottom: '0.5rem' }}>{s.value}</div>
                <p style={{ fontSize: '0.82rem', color: dm ? '#9ab89a' : '#6b7a5f', margin: 0, lineHeight: 1.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Goals */}
        <section className="card" style={{ background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}` }}>
          <h2 style={{ color: dm ? '#d0e8d0' : '#5c6b52' }}>Our Goals & Vision</h2>
          <p style={{ color: dm ? '#9ab89a' : '#6b7a5f', marginBottom: '1.5rem' }}>
            Climate Matters exists to inform, inspire, and empower people to be part of the solution.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {goals.map((g, idx) => (
              <div key={idx} style={{
                padding: '1.25rem',
                background: dm ? '#2e3a28' : '#f5f5dc',
                borderRadius: '12px',
                border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}`,
              }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{g.emoji}</div>
                <strong style={{ color: dm ? '#c1d6c1' : '#5c6b52', display: 'block', marginBottom: '0.4rem' }}>{g.title}</strong>
                <p style={{ color: dm ? '#9ab89a' : '#6b7a5f', fontSize: '0.875rem', margin: 0, lineHeight: 1.6 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="card" style={{ background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}` }}>
          <h2 style={{ color: dm ? '#d0e8d0' : '#5c6b52' }}>Climate Change Timeline</h2>
          <p style={{ color: dm ? '#9ab89a' : '#6b7a5f', marginBottom: '1.5rem' }}>Key milestones in the global response to climate change.</p>
          <div style={{ position: 'relative', paddingLeft: '1.5rem', borderLeft: `3px solid ${dm ? '#4a6a3a' : '#c1d6c1'}` }}>
            {timeline.map((item, idx) => (
              <div key={idx} style={{
                position: 'relative',
                marginBottom: idx < timeline.length - 1 ? '1.5rem' : 0,
                paddingLeft: '1.25rem',
              }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute',
                  left: '-1.85rem',
                  top: '0.3rem',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: dm ? '#7a9a7a' : '#9caf88',
                  border: `2px solid ${dm ? '#3d4a35' : '#fff'}`,
                  boxShadow: `0 0 0 2px ${dm ? '#7a9a7a' : '#9caf88'}`,
                }} />
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: dm ? '#7a9a7a' : '#9caf88',
                  background: dm ? '#2e3a28' : '#f0f5ee',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '8px',
                  marginBottom: '0.35rem',
                }}>{item.year}</span>
                <p style={{ color: dm ? '#c1d6c1' : '#5c6b52', margin: 0, fontSize: '0.92rem', lineHeight: 1.6 }}>{item.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What I Care About */}
        <section className="card" style={{ background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}` }}>
          <h2 style={{ color: dm ? '#d0e8d0' : '#5c6b52' }}>What I Care About</h2>
          <blockquote style={{
            fontStyle: 'italic',
            borderLeft: `4px solid ${dm ? '#7a9a7a' : '#9caf88'}`,
            paddingLeft: '1.5rem',
            margin: '1.5rem 0',
            color: dm ? '#9ab89a' : '#6b7a5f',
            fontSize: '1.1rem',
          }}>
            "Protecting our planet is a shared responsibility that starts with awareness."
          </blockquote>
          <p style={{ color: dm ? '#9ab89a' : '#6b7a5f', lineHeight: 1.8 }}>
            Global warming is causing rapid melting of Earth's ice, particularly in the Arctic and Antarctic,
            with glaciers losing over a trillion tons of ice annually.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem',
          }}>
            {[
              { title: 'The Reality', desc: 'From melting ice caps to extreme weather, the evidence is all around us.' },
              { title: 'The Goal', desc: 'Sharing information and inspiring others to take action.' },
            ].map((item, idx) => (
              <div key={idx} style={{ padding: '1.25rem', background: dm ? '#2e3a28' : '#f5f5dc', borderRadius: '12px' }}>
                <strong style={{ color: dm ? '#c1d6c1' : '#5c6b52', display: 'block', marginBottom: '0.5rem' }}>{item.title}</strong>
                <p style={{ color: dm ? '#9ab89a' : '#6b7a5f', fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Mission */}
        <section className="card" style={{ background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}` }}>
          <h2 style={{ color: dm ? '#d0e8d0' : '#5c6b52' }}>Our Mission</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { num: '01', title: 'Educational Foundation', desc: 'Studying the scientific complexities of climate change.' },
              { num: '02', title: 'Impact Awareness', desc: 'Analyzing how daily choices shape our ecosystem.' },
              { num: '03', title: 'Digital Advocacy', desc: 'Using technology to spread awareness and inspire change.' }
            ].map((item, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                padding: '1.25rem',
                background: dm ? '#2e3a28' : '#f5f5dc',
                borderRadius: '12px',
              }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: dm ? '#7a9a7a' : '#9caf88', lineHeight: 1 }}>{item.num}</span>
                <div>
                  <strong style={{ color: dm ? '#c1d6c1' : '#5c6b52', display: 'block', marginBottom: '0.25rem' }}>{item.title}</strong>
                  <p style={{ color: dm ? '#9ab89a' : '#6b7a5f', fontSize: '0.9rem', margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Climate Actions */}
        <section className="card" style={{ background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}` }}>
          <h2 style={{ color: dm ? '#d0e8d0' : '#5c6b52', textAlign: 'center' }}>Key Climate Actions</h2>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', margin: '1.5rem 0' }}>
            {['🌱 Reduce Carbon Footprint', '♻️ Recycle & Reuse', '☀️ Support Renewable Energy'].map((a, i) => (
              <div key={i} style={{
                padding: '0.875rem 1.75rem',
                background: dm ? '#4a6a3a' : '#c1d6c1',
                color: dm ? '#c1d6c1' : '#3d4a35',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: 500,
              }}>{a}</div>
            ))}
          </div>
        </section>

        {/* Meet the Author */}
        <section className="card" style={{ background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}` }}>
          <h2 style={{ color: dm ? '#d0e8d0' : '#5c6b52', marginBottom: '1.5rem' }}>Meet the Author</h2>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: dm ? 'linear-gradient(135deg, #7a9a7a, #4a6a3a)' : 'linear-gradient(135deg, #9caf88, #c1d6c1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              flexShrink: 0,
            }}>👤</div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h3 style={{ color: dm ? '#d0e8d0' : '#5c6b52', margin: '0 0 0.25rem' }}>Emmanuel Bacal</h3>
              <p style={{ color: dm ? '#7a9a7a' : '#9caf88', fontSize: '0.875rem', margin: '0 0 0.75rem', fontWeight: 500 }}>
                Web Developer & Climate Advocate
              </p>
              <p style={{ color: dm ? '#9ab89a' : '#6b7a5f', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                A passionate developer and environmental advocate dedicated to using technology
                as a tool for climate awareness. This portfolio is a personal initiative to make
                climate science more accessible to everyone.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {['React Developer', 'Climate Enthusiast', 'BSCS Student'].map((badge, i) => (
                  <span key={i} style={{
                    padding: '0.3rem 0.75rem',
                    background: dm ? '#2e3a28' : '#f5f5dc',
                    color: dm ? '#c1d6c1' : '#5c6b52',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}`,
                  }}>{badge}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Closing Quote */}
        <blockquote style={{
          textAlign: 'center',
          fontStyle: 'italic',
          fontSize: '1.2rem',
          color: dm ? '#9ab89a' : '#6b7a5f',
          marginTop: '2rem',
          padding: '2rem',
          background: dm ? '#3d4a35' : '#f5f5dc',
          borderRadius: '16px',
          border: `1px solid ${dm ? '#4a5a42' : 'transparent'}`,
        }}>
          "We do not inherit the Earth from our ancestors;<br />we borrow it from our children."
        </blockquote>

        {/* Quiz Section */}
        <section className="card" style={{ marginTop: '2rem', background: dm ? '#3d4a35' : '#ffffff', border: `1px solid ${dm ? '#4a5a42' : '#d4d9cf'}` }}>
          <h2 style={{ color: dm ? '#d0e8d0' : '#5c6b52', textAlign: 'center', marginBottom: '0.5rem' }}>
            🌿 Test Your Climate Knowledge
          </h2>
          <p style={{ color: dm ? '#9ab89a' : '#6b7a5f', textAlign: 'center', marginBottom: '2rem' }}>
            Take this quick quiz to see how much you know about climate change.
          </p>

          {!quizComplete ? (
            <div style={{ maxWidth: '560px', margin: '0 auto' }}>
              <div style={{
                display: 'inline-block',
                padding: '0.4rem 1rem',
                background: dm ? '#2e3a28' : '#f5f5dc',
                borderRadius: '20px',
                marginBottom: '1.25rem',
                color: dm ? '#c1d6c1' : '#5c6b52',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}>
                Question {currentQ + 1} of {quizData.length}
              </div>

              {/* Progress bar */}
              <div style={{ background: dm ? '#2e3a28' : '#e8ede4', borderRadius: '10px', height: '6px', marginBottom: '1.5rem' }}>
                <div style={{
                  width: `${((currentQ) / quizData.length) * 100}%`,
                  background: dm ? '#7a9a7a' : '#9caf88',
                  height: '6px',
                  borderRadius: '10px',
                  transition: 'width 0.4s ease',
                }} />
              </div>

              <h3 style={{ color: dm ? '#d0e8d0' : '#5c6b52', marginBottom: '1.25rem', fontSize: '1.1rem', textAlign: 'left' }}>
                {quizData[currentQ].question}
              </h3>

              <div>
                {quizData[currentQ].options.map((opt, idx) => (
                  <div key={idx} style={optionStyle(selected === idx)} onClick={() => handleSelect(idx)}>
                    {opt}
                  </div>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={selected === null || showResult}
                style={{ marginTop: '1.5rem', width: '100%' }}
              >
                Submit Answer
              </button>

              {showResult && (
                <p style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  background: selected === quizData[currentQ].answer 
                    ? (dm ? '#4a6a3a' : '#c1d6c1')
                    : (dm ? '#3a2a2a' : '#e8e4d9'),
                  color: selected === quizData[currentQ].answer 
                    ? (dm ? '#c1d6c1' : '#3d4a35')
                    : (dm ? '#c0a0a0' : '#5c6b52'),
                  fontWeight: 500,
                  textAlign: 'center',
                }}>
                  {selected === quizData[currentQ].answer
                    ? '✓ Correct!'
                    : `✗ Wrong! Correct answer: ${quizData[currentQ].options[quizData[currentQ].answer]}`}
                </p>
              )}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: dm 
                ? 'linear-gradient(135deg, #4a6a3a 0%, #3a5a2a 100%)'
                : 'linear-gradient(135deg, #c1d6c1 0%, #9caf88 100%)',
              borderRadius: '16px',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>
                {score === quizData.length ? '🏆' : score >= 3 ? '🌿' : '🌱'}
              </div>
              <h3 style={{ color: dm ? '#f0f5ee' : '#ffffff', marginBottom: '0.5rem' }}>Quiz Complete!</h3>
              <p style={{ color: dm ? '#c1d6c1' : '#f5f5dc', fontSize: '1.25rem', margin: '0 0 0.5rem' }}>
                You scored {score} out of {quizData.length}
              </p>
              <p style={{ color: dm ? '#9ab89a' : '#e8f5e8', fontSize: '0.9rem', margin: 0 }}>
                {score === quizData.length
                  ? 'Perfect score! You\'re a climate expert! 🌍'
                  : score >= 3
                  ? 'Great job! Keep learning about our planet.'
                  : 'Keep exploring — every step toward awareness matters!'}
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default AboutPage;