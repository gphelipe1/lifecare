import { Card } from "antd";

import * as Styled from './styles';
import { ParticlesComponent, LoginForm, RegistrationForm } from "../../Components";
import { useState } from "react";
import { UserTypes } from "../../Types";

const Authentication: React.FC = () => {
    const [authMode, setAuthMode] = useState<UserTypes.AuthMode>(UserTypes.AuthMode.SignIn);

    return (
        <Styled.Container>
            <Styled.TemplateContainer>
                <ParticlesComponent />
                    <Styled.CustomTitle level={1}>
                        LifeCare
                    </Styled.CustomTitle>
            </Styled.TemplateContainer>
            <Card>
                <Styled.FormContainer>
                    <Styled.CustomCard>
                    {authMode === UserTypes.AuthMode.SignIn ? 
                        <LoginForm setAuthMode={setAuthMode} /> : <RegistrationForm setAuthMode={setAuthMode} />}
                    </Styled.CustomCard>
                </Styled.FormContainer>
            </Card>
        </Styled.Container>
    );
};

export default Authentication;
