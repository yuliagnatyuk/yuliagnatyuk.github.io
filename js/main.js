  const projects = [
    {
      num: '01',
      icon: '◈',
      title: 'Алгоритм Краскала',
      desc: 'Реалізація алгоритму мінімального остовного дерева для орієнтованого графа з 9 вершинами на C#. Вага МОД — 15.',
      tags: ['C#', 'Графи', 'Алгоритми'],
      link: '#'
    },
    {
      num: '02',
      icon: '⬡',
      title: 'Циклічний список',
      desc: 'Циклічний однозв\'язний список із операціями пошуку за індексом, вставки перед елементом і видалення за значенням. Складність O(n).',
      tags: ['C#', 'Структури даних'],
      link: '#'
    },
    {
      num: '03',
      icon: '✦',
      title: 'Система магазину',
      desc: 'ООП-система керування магазином: класи Product, Client, Order, Shop з інтерактивним консольним меню і збереженням даних.',
      tags: ['C#', 'ООП', 'LINQ'],
      link: '#'
    },
    {
      num: '04',
      icon: '◇',
      title: 'Портфоліо-лендінг',
      desc: 'Адаптивна односторінкова сторінка-портфоліо з перемикачем теми, анімаціями при скролі і формою зворотного зв\'язку.',
      tags: ['HTML', 'CSS', 'JS'],
      link: '#'
    },
    {
      num: '05',
      icon: '◉',
      title: 'BookCrossing — сайт обміну книг',
      desc: 'Вебзастосунок для вільного обміну паперовими книгами за принципом BookCrossing. Каталог книг, реєстрація/авторизація, обране, особистий кабінет.',
      tags: ['HTML', 'CSS', 'JS', 'Node.js', 'MySQL'],
      link: 'https://github.com/yuliagnatyuk',
      screenshot: 'img/bookcrossing-preview.jpg'
    }
  ];

  function renderProjects() 
  {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = projects.map((p, i) => `
      <a class="project-card fade-in fade-in-delay-${Math.min(i + 1, 6)}" href="${p.link}" ${p.link !== '#' ? 'target="_blank" rel="noopener"' : ''}>
        <span class="project-num">${p.num}</span>
        ${p.screenshot ? `<div class="project-screenshot"><img src="${p.screenshot}" alt="${p.title}"></div>` : `<span class="project-icon">${p.icon}</span>`}
        <div class="project-title">${p.title}</div>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>
        <span class="project-arrow">↗</span>
      </a>
    `).join('');
    observeAll();
  }

  function toggleTheme()
  {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', next === 'dark' ? '' : 'light');
    localStorage.setItem('theme', next);
    document.getElementById('themeBtn').textContent = next === 'light' ? '◑ Тема' : '◐ Тема';
  }

  function initTheme() 
  {
    const saved = localStorage.getItem('theme') || 'dark';
    if (saved === 'light') {
      document.body.setAttribute('data-theme', 'light');
      document.getElementById('themeBtn').textContent = '◑ Тема';
    }
  }

  function toggleMenu() 
  {
    const btn = document.getElementById('burgerBtn');
    const menu = document.getElementById('mobileMenu');
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  }
  function closeMenu() 
  {
    document.getElementById('burgerBtn').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
  }

  function observeAll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function submitForm() {
    const name = document.getElementById('fname');
    const email = document.getElementById('femail');
    const message = document.getElementById('fmessage');
    let valid = true;

    [name, email, message].forEach(el => el.classList.remove('invalid'));

    if (!name.value.trim()) {
      name.classList.add('invalid'); valid = false;
    }
    if (!validateEmail(email.value.trim())) {
      email.classList.add('invalid'); valid = false;
    }
    if (!message.value.trim()) {
      message.classList.add('invalid'); valid = false;
    }

    if (!valid) return;

    const data = {
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
      date: new Date().toLocaleDateString('uk-UA')
    };

    const all = JSON.parse(localStorage.getItem('messages') || '[]');
    all.push(data);
    localStorage.setItem('messages', JSON.stringify(all));

    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').classList.add('visible');
  }

  const sections = ['hero', 'about', 'projects', 'contact'];
  const navLinks = document.querySelectorAll('.nav-links a');
  const backTop = document.getElementById('backTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 400) {
      backTop.classList.add('visible');
    } else {
      backTop.classList.remove('visible');
    }
    let current = 'hero';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop - 100) current = id;
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });

  document.addEventListener('DOMContentLoaded', () => { initTheme(); renderProjects(); observeAll(); });