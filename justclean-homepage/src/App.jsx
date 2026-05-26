import { useEffect, useState } from "react";
import "./App.css";

const imagePath = (path) => `${import.meta.env.BASE_URL}images/${path}`;

function SmartImage({ src, alt, label, className = "" }) {
  const [isError, setIsError] = useState(false);

  if (!src || isError) {
    return (
      <div className={`image-placeholder ${className}`}>
        {label && <span>{label}</span>}
        <p>이미지를 추가해주세요</p>
      </div>
    );
  }

  return (
    <div className={`image-wrap protected-image ${className}`}>
      {label && <span className="image-label">{label}</span>}
      <img
        src={src}
        alt={alt}
        draggable="false"
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
        onError={() => setIsError(true)}
      />
      <span className="watermark">JUST CLEAN</span>
    </div>
  );
}

function HeroSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="hero-slider">
      {images.map((image, index) => (
        <div
          key={image}
          className={`hero-slide ${index === currentIndex ? "active" : ""}`}
        >
          <SmartImage
            src={image}
            alt={`저스클린 대표 이미지 ${index + 1}`}
            label="JUST CLEAN"
            className="hero-image"
          />
        </div>
      ))}

      <div className="slider-dots">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === currentIndex ? "active" : ""}
            onClick={() => setCurrentIndex(index)}
            aria-label={`${index + 1}번 대표 이미지 보기`}
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const blockContextMenu = (event) => {
      if (event.target.closest(".protected-image")) {
        event.preventDefault();
      }
    };

    const blockDrag = (event) => {
      if (event.target.tagName === "IMG") {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("dragstart", blockDrag);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("dragstart", blockDrag);
    };
  }, []);

  const business = {
    name: "저스클린",
    phone: "010-9493-7701",
    phoneHref: "01094937701",
    slogan: "공간의 오염을 확인하고, 결과로 보여주는 청소",
    description:
      "저스클린은 오염도 확인부터 장비 세팅, 건식·습식 클리닝, 살균 소독까지 공간 상태에 맞춰 꼼꼼하게 관리하는 청소 전문 서비스입니다.",
    blog: "https://blog.naver.com/ajswl0510",
    place:
      "https://map.naver.com/p/search/%EC%A0%80%EC%8A%A4%ED%81%B4%EB%A6%B0/place/1479521505?c=15.00,0,0,0,dh&placePath=/home?bk_query=%EC%A0%80%EC%8A%A4%ED%81%B4%EB%A6%B0&entry=pll&from=map&fromPanelNum=2&timestamp=202605251002&locale=ko&svcName=map_pcv5&searchText=%EC%A0%80%EC%8A%A4%ED%81%B4%EB%A6%B0",
    daangn:
      "https://www.daangn.com/kr/local-profile/%EC%A0%80%EC%8A%A4%ED%81%B4%EB%A6%B0-oi77db9u3qat/",
    instagram: "https://www.instagram.com/justclean2026?igsh=Mnc0OTQ1OGs0bGo1",
  };

  const heroImages = [
    imagePath("hero/hero-01.jpg"),
    imagePath("hero/hero-02.jpg"),
    imagePath("hero/hero-03.jpg"),
    imagePath("hero/hero-04.jpg"),
    imagePath("hero/hero-05.jpg"),
    imagePath("hero/hero-06.jpg"),
  ];

  const services = [
    {
      title: "건식 작업",
      subTitle: "Dry Cleaning",
      description:
        "먼지, 이물질, 표면 오염을 먼저 제거해 본격적인 청소 전 공간 상태를 정리합니다.",
      image: imagePath("work/dry-cleaning.jpg"),
    },
    {
      title: "습식 작업",
      subTitle: "Wet Cleaning",
      description:
        "깊게 남은 오염은 습식 장비를 활용해 세척하고, 전후 차이가 보이도록 관리합니다.",
      image: imagePath("work/wet-cleaning.jpg"),
    },
    {
      title: "살균 소독",
      subTitle: "Disinfection",
      description:
        "청소 후 위생 관리가 필요한 공간에 살균 소독 작업을 더해 쾌적한 환경을 만듭니다.",
      image: imagePath("work/disinfection.jpg"),
    },
    {
      title: "장비 전문 케어",
      subTitle: "Equipment Care",
      description:
        "공간과 오염 상태에 맞춰 장비를 세팅하고 효율적이고 꼼꼼하게 작업합니다.",
      image: imagePath("work/equipment-setting.jpg"),
    },
  ];

  const workSteps = [
    {
      title: "현장 방문",
      text: "청소가 필요한 공간과 작업 환경을 먼저 확인합니다.",
      image: imagePath("work/site-visit.jpg"),
    },
    {
      title: "장비 세팅",
      text: "작업 공간과 오염 상태에 맞춰 필요한 장비와 도구를 준비합니다.",
      image: imagePath("work/equipment-setting.jpg"),
    },
    {
      title: "오염도 체크",
      text: "오염 상태와 범위를 확인해 건식, 습식, 살균 소독 작업 순서를 정합니다.",
      image: imagePath("work/pollution-check.jpg"),
    },
    {
      title: "건식 작업",
      text: "먼지와 이물질을 먼저 제거해 습식 작업 전 공간을 정리합니다.",
      image: imagePath("work/dry-cleaning.jpg"),
    },
    {
      title: "습식 작업",
      text: "깊은 오염과 생활 오염을 습식 장비로 꼼꼼하게 세척합니다.",
      image: imagePath("work/wet-cleaning.jpg"),
    },
    {
      title: "살균 소독",
      text: "청소 후 위생 관리가 필요한 부분에 살균 소독 작업을 진행합니다.",
      image: imagePath("work/disinfection.jpg"),
    },
    {
      title: "청소 완료",
      text: "마무리 점검 후 작업 결과를 확인할 수 있도록 정리합니다.",
      image: imagePath("work/cleaning-complete.jpg"),
    },
  ];

  const beforeAfterList = [
    {
      title: "오염 제거 전후",
      before: imagePath("before-after/before-01.jpg"),
      after: imagePath("before-after/after-01.jpg"),
    },
    {
      title: "생활 오염 클리닝 전후",
      before: imagePath("before-after/before-02.jpg"),
      after: imagePath("before-after/after-02.jpg"),
    },
    {
      title: "전체 세탁 전후",
      before: imagePath("before-after/before-03.jpg"),
      after: imagePath("before-after/after-03.jpg"),
    },
    {
      title: "부분 오염 집중 케어 전후",
      before: imagePath("before-after/before-04.jpg"),
      after: imagePath("before-after/after-04.jpg"),
    },
    {
      title: "습식 클리닝 전후",
      before: imagePath("before-after/before-05.jpg"),
      after: imagePath("before-after/after-05.jpg"),
    },
    {
      title: "마무리 케어 전후",
      before: imagePath("before-after/before-06.jpg"),
      after: imagePath("before-after/after-06.jpg"),
    },
  ];

  const channels = [
    {
      name: "네이버 블로그",
      text: "작업 사례와 자세한 청소 과정을 확인할 수 있습니다.",
      url: business.blog,
    },
    {
      name: "네이버 플레이스",
      text: "업체 정보, 지도, 리뷰를 확인할 수 있습니다.",
      url: business.place,
    },
    {
      name: "당근 프로필",
      text: "동네 기반 상담과 업체 정보를 확인할 수 있습니다.",
      url: business.daangn,
    },
    {
      name: "인스타그램",
      text: "작업 사진과 소식을 빠르게 확인할 수 있습니다.",
      url: business.instagram,
    },
  ];

  return (
    <div className="page">
      <header className="site-header">
        <div className="header-inner">
          <a href="#home" className="logo">
            {business.name}
          </a>

          <nav className="nav">
            <a href="#service">서비스</a>
            <a href="#work">작업과정</a>
            <a href="#before-after">전후사진</a>
            <a href="#contact">문의</a>
          </nav>

          <a className="header-call" href={`tel:${business.phoneHref}`}>
            전화 상담
          </a>
        </div>
      </header>

      <main id="home">
        <section
          className="hero-section"
          style={{
            "--hero-bg-image": `url(${imagePath("hero/hero-bg.jpg")})`,
          }}
        >
          <div className="hero-content">
            <p className="section-badge">Premium Cleaning Service</p>
            <h1>{business.slogan}</h1>
            <p className="hero-description">{business.description}</p>

            <div className="hero-buttons">
              <a className="btn btn-primary" href={`tel:${business.phoneHref}`}>
                전화 상담하기
              </a>
              <a className="btn btn-secondary" href="#before-after">
                작업 사진 보기
              </a>
            </div>

            <div className="hero-summary">
              <div>
                <span>상담 전화</span>
                <strong>{business.phone}</strong>
              </div>
              <div>
                <span>작업 방식</span>
                <strong>현장 방문 · 건식 · 습식 · 살균 소독</strong>
              </div>
            </div>
          </div>

          <div className="hero-image-area">
            <HeroSlider images={heroImages} />
          </div>
        </section>

        <section className="section intro-section">
          <div
            className="intro-card"
            style={{
              "--about-bg-image": `url(${imagePath("about/about-bg.jpg")})`,
            }}
          >
            <p className="section-badge">About</p>
            <h2>저스클린은 과정과 결과를 함께 보여주는 청소를 지향합니다.</h2>
            <p>
              청소는 단순히 표면을 닦는 일이 아니라, 고객이 다시 안심하고 사용할
              수 있는 공간을 만드는 일입니다. 저스클린은 현장 상태를 확인하고,
              오염도에 맞는 장비와 방식으로 꼼꼼하게 작업합니다.
            </p>
          </div>

          <div className="trust-grid">
            <div>
              <strong>01</strong>
              <h3>현장 중심 확인</h3>
              <p>사진과 현장 상태를 바탕으로 필요한 작업 범위를 확인합니다.</p>
            </div>
            <div>
              <strong>02</strong>
              <h3>오염도 맞춤 케어</h3>
              <p>오염 상태에 맞춰 건식, 습식, 살균 소독 방식을 선택합니다.</p>
            </div>
            <div>
              <strong>03</strong>
              <h3>작업 결과 확인</h3>
              <p>작업 전후 사진으로 청소 결과를 직관적으로 보여줍니다.</p>
            </div>
          </div>
        </section>

        <section id="service" className="section service-section">
          <div className="section-title">
            <p className="section-badge">Service</p>
            <h2>저스클린 주요 서비스</h2>
            <p>
              공간과 오염 상태에 맞춰 건식 작업, 습식 작업, 살균 소독, 장비 전문
              케어를 진행합니다.
            </p>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <SmartImage
                  src={service.image}
                  alt={service.title}
                  label={service.subTitle}
                  className="service-image"
                />

                <div className="service-content">
                  <span>{service.subTitle}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="section-title work-title">
            <p className="section-badge">Work Process</p>
            <h2>작업은 이렇게 진행됩니다.</h2>
            <p>
              현장 방문부터 장비 세팅, 오염도 체크, 건식 작업, 습식 작업, 살균
              소독, 청소 완료까지 순서대로 진행됩니다.
            </p>
          </div>

          <div className="work-timeline-wrap">
            <div className="work-timeline">
              {workSteps.map((step, index) => (
                <article className="work-card" key={step.title}>
                  <SmartImage
                    src={step.image}
                    alt={step.title}
                    label={String(index + 1).padStart(2, "0")}
                    className="work-image"
                  />

                  <div className="work-content">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="before-after" className="section before-after-section">
          <div className="section-title">
            <p className="section-badge">Before & After</p>
            <h2>작업 전후 사진으로 결과를 확인하세요.</h2>
            <p>
              청소 서비스에서 가장 중요한 것은 실제 결과입니다. 작업 전후 사진을
              통해 오염 개선과 공간 변화를 직관적으로 확인할 수 있습니다.
            </p>
          </div>

          <div className="before-after-grid">
            {beforeAfterList.map((item) => (
              <article className="before-after-card" key={item.title}>
                <h3>{item.title}</h3>

                <div className="compare-grid">
                  <SmartImage
                    src={item.before}
                    alt={`${item.title} 전`}
                    label="Before"
                  />
                  <SmartImage
                    src={item.after}
                    alt={`${item.title} 후`}
                    label="After"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section channel-section">
          <div className="section-title">
            <p className="section-badge">Channel</p>
            <h2>저스클린 공식 채널</h2>
            <p>
              블로그, 플레이스, 당근, 인스타그램에서 더 많은 정보를 확인할 수
              있습니다.
            </p>
          </div>

          <div className="channel-grid">
            {channels.map((channel) => (
              <a
                key={channel.name}
                className="channel-card"
                href={channel.url}
                target="_blank"
                rel="noreferrer"
              >
                <strong>{channel.name}</strong>
                <p>{channel.text}</p>
                <span>바로가기 →</span>
              </a>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="contact-section"
          style={{
            "--contact-left-bg-image": `url(${imagePath("contact/contact-left.jpg")})`,
            "--contact-right-bg-image": `url(${imagePath("contact/contact-right.jpg")})`,
          }}
        >
          <div className="contact-inner">
            <p className="section-badge">Contact</p>
            <h2>청소 상담이 필요하신가요?</h2>
            <p>
              공간 사진과 원하는 청소 범위를 보내주시면 더 빠르게 상담이
              가능합니다.
            </p>

            <div className="contact-buttons">
              <a className="btn btn-white" href={`tel:${business.phoneHref}`}>
                전화 상담하기
              </a>
              <a
                className="btn btn-outline-white"
                href={`sms:${business.phoneHref}`}
              >
                문자 상담하기
              </a>
              <a
                className="btn btn-outline-white"
                href={business.place}
                target="_blank"
                rel="noreferrer"
              >
                네이버 플레이스
              </a>
            </div>

            <strong className="contact-phone">{business.phone}</strong>
          </div>
        </section>
      </main>

      <footer className="footer">
        <strong>{business.name}</strong>
        <p>{business.phone}</p>
        <p>
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </footer>

      <a className="floating-call" href={`tel:${business.phoneHref}`}>
        전화 상담
      </a>
    </div>
  );
}

export default App;
