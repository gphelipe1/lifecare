import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;

    .ant-spin-text
    {
        right: 1.4rem;
    }
`;