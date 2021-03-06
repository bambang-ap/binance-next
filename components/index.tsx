export * from "./Chart";

import styled from "styled-components";
import { COLORS } from "../constans";

import { FlexBox, getFlexBox } from "../types/flexBox.type";

export const View = styled.div<FlexBox>((props) => {
  const { flexBoxStyleProps } = getFlexBox(props);
  const { textAlign, ...rest } = flexBoxStyleProps ?? {};
  const { onClick } = props;
  return {
    ...rest,
    display: "flex",
    flexDirection: "column",
    cursor: onClick ? "pointer" : undefined,
  };
});

export const Container = styled(View)({
  flex: 1,
  padding: 5,
});

export const Wrapper = styled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
});

export const Text = styled.p((props) => {
  const { onClick } = props;
  return {
    cursor: onClick ? "pointer" : undefined,
    fontSize: 14,
  };
});

export const Button = styled.div(() => {
  return {
    backgroundColor: COLORS.primary,
    cursor: "pointer",
    color: COLORS.white,
    padding: 14,
  };
});

export const Input = (props: typeof StyledInput["defaultProps"]) => {
  const { onChangeText, onChange, onKeyUp, onSubmitEditting, ...rest } =
    props ?? {};

  return (
    <StyledInput
      onChange={(event) => {
        onChangeText?.(event.target.value);
        onChange?.(event);
      }}
      onKeyUp={(event) => {
        if (event.key === "Enter") onSubmitEditting?.();
        onKeyUp?.(event);
      }}
      {...rest}
    />
  );
};

const StyledInput = styled.input<{
  onChangeText?: (value: string) => void;
  onSubmitEditting?: () => void;
}>(() => {
  return {};
});
