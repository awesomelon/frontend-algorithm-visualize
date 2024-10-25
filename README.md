# Algorithm Visualizer (알고리즘 시각화)

알고리즘 비주얼라이저는 다양한 정렬 알고리즘의 동작 과정을 시각적으로 표현하여 학습자들이 알고리즘을 쉽게 이해할 수 있도록 도와주는 웹 애플리케이션입니다.

## 🚀 주요 기능

### 정렬 알고리즘
- 버블 정렬 (Bubble Sort)
- 선택 정렬 (Selection Sort)
- 삽입 정렬 (Insertion Sort)
- 퀵 정렬 (Quick Sort)

### 시각화 기능
- 실시간 정렬 과정 애니메이션
- 상태별 색상 구분
    - 파란색: 미정렬 상태
    - 노란색: 비교 중인 요소
    - 빨간색: 교환 중인 요소
    - 보라색: 피벗 요소
    - 초록색: 정렬 완료된 요소

### 제어 기능
- 재생/일시정지
- 처음으로 되돌리기
- 새로운 배열 생성
- 정렬 속도 조절
- 배열 크기 조절

## 🛠️ 기술 스택

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (아이콘)

## ⚙️ 설치 및 실행

1. 저장소 클론
```bash
git clone [repository-url]
cd algorithm-visualizer
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 빌드
```bash
npm run build
```

## 🎯 프로젝트 구조

```
src/
├── components/
│   └── SortingVisualizer.tsx
├── types/
│   └── sorting.ts
├── App.tsx
└── main.tsx
```

## 📝 정렬 알고리즘 시간 복잡도

| 알고리즘 | 평균 시간 복잡도 | 공간 복잡도 |
|---------|----------------|------------|
| 버블 정렬 | O(n²) | O(1) |
| 선택 정렬 | O(n²) | O(1) |
| 삽입 정렬 | O(n²) | O(1) |
| 퀵 정렬 | O(n log n) | O(log n) |

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🙏 감사의 글

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

## 📞 문의하기

프로젝트 관련 문의사항이 있으시다면 이슈를 생성해 주시거나 다음 연락처로 문의해 주세요:

- Email: [bangjh1114@gmail.com](mailto:bangjh1114@gmail.com)
- Website: [j-ho.dev](https://j-ho.dev)
