import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import usePrevProps from 'hooks/usePrevProps';

const MaterialInputWrapper = styled.div`
  display: inline-block;
  padding-top: ${({ titleSize, units }) => `${titleSize}${units}`};
  position: relative;
`;

const MaterialLabel = styled.label`
  pointer-events: none;
  transition: all 150ms linear;
  position: absolute;
  color: ${({ theme }) => theme.disabled};
  ${({ align }) => align}: 0;
  top: ${({ moved, titleSize, spacing, units }) => `${moved ? 0 : titleSize + spacing}${units}`};
  font-size: ${({ moved, titleSize, placeholderSize, units }) => `${moved ? titleSize : placeholderSize}${units}`};
`;

const MaterialInput = ({ children, label, titleSize = 12, placeholderSize = 18, spacing = 0, align = 'left', className, units = 'px' }) => {
  const [labelMoved, setLabelMoved] = useState(children.props.value !== '');

  const prevChildren = usePrevProps(children);

  useEffect(() => {
    if ((prevChildren.props.value === '') !== (children.props.value === '')) {
      setLabelMoved(children.props.value !== '');
    }
  }, [children, prevChildren.props.value]);

  const handleLabelMove = (shouldFocus, originalFunction) => e => {
    originalFunction && originalFunction(e);
    setLabelMoved(shouldFocus || e.target.value !== '');
  };

  return (
    <MaterialInputWrapper titleSize={titleSize} className={className} units={units}>
      <MaterialLabel
        align={align}
        moved={labelMoved}
        titleSize={titleSize}
        spacing={spacing}
        placeholderSize={placeholderSize}
        units={units}
        htmlFor={children.props.id || label}
      >
        {label}
      </MaterialLabel>
      {React.cloneElement(children, {
        id: children.props.id || label,
        onFocus: handleLabelMove(true, children.props.onFocus),
        onBlur: handleLabelMove(false, children.props.onBlur),
      })}
    </MaterialInputWrapper>
  );
};

MaterialInput.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  label: PropTypes.string,
  titleSize: PropTypes.number,
  placeholderSize: PropTypes.number,
  spacing: PropTypes.number,
  align: PropTypes.oneOf(['left', 'right']),
  units: PropTypes.oneOf(['px', 'em', 'rem', '%', 'cm', 'ex', 'in', 'mm', 'pc', 'pt']),
};

export default MaterialInput;
