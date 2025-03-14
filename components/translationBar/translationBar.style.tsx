import styled from "styled-components/native";

export const TranslationBarContainer = styled.View`
  width: 100%;
  height: 100px;
  max-height: 400px;
  margin-top: 30px; /* Zmniejszony margines na górze */
  padding: 15px; /* Mniejsze padding dla bardziej zwięzłego wyglądu */
  background: rgba(171, 173, 196, 0.7);
  align-items: center;
  justify-content: center;
  border-radius: 15px; /* Zaokrąglone rogi */
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Dodanie cienia dla efektu wypukłości */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Lekka biała ramka */
`;
