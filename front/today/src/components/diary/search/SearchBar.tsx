import React from 'react';
import * as S from './style';

interface SearchBarProps {
  filterText: string;
  setFilterText: (text: string) => void;
  onSubmit: () => void;
}

function SearchBar({ filterText, setFilterText, onSubmit }: SearchBarProps) {
  return (
    <S.SearchContainer>
      <S.Search
        placeholder="키워드를 입력해주세요."
        onChangeText={setFilterText}
        value={filterText}
        onSubmitEditing={onSubmit}
      />
    </S.SearchContainer>
  );
}

export default SearchBar;
