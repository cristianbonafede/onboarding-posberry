import { Form, Input as Inputd } from 'antd';
import { useEffect, useState } from 'react';

const Input = (props) => {
  const {
    label,
    name,
    placeholder,
    autofocus,
    password,
    required,
    readonly,
    centered,
    hidden,
    validators,
    onChange,
  } = props;

  const [focused, setFocused] = useState(false);
  const [colorPrimary, setColorPrimary] = useState();

  useEffect(() => {
    setColorPrimary(sessionStorage.getItem('color-primary'));
  }, []);

  const renderStyle = () => {
    const style = {
      borderColor: focused ? colorPrimary : '#d8d6de',
    };

    return style;
  };

  const setRules = () => {
    let rules = [];

    if (required) {
      rules.push({
        required: true,
        message: 'Este campo es obligatorio',
      });
    }

    if (!validators) {
      return rules;
    }

    for (let i = 0; i < validators.length; i++) {
      rules.push(validators[i]);
    }

    return rules;
  };

  if (password) {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={setRules()}
        className={`${centered ? 'centered' : ''}`}
      >
        <Inputd.Password
          placeholder={placeholder}
          autoFocus={autofocus}
          readOnly={readonly}
          className={`${hidden && 'hidden'}`}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={renderStyle()}
        />
      </Form.Item>
    );
  }

  return (
    <Form.Item
      label={label}
      name={name}
      rules={setRules()}
      className={`${centered ? 'centered' : ''}`}
    >
      <Inputd
        placeholder={placeholder}
        autoFocus={autofocus}
        readOnly={readonly}
        className={`${hidden && 'hidden'}`}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={renderStyle()}
      />
    </Form.Item>
  );
};

export default Input;
