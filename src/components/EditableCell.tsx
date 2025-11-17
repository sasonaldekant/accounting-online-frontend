import React, { useState, useEffect, useCallback } from 'react';
import {
  TableCell,
  TextField,
  Box,
  Typography,
  CircularProgress,
  Tooltip,
  Fade,
} from '@mui/material';
import { Check, Error, HourglassThin } from '@mui/icons-material';
import { AutoSaveStatus } from '../types';

interface EditableCellProps {
  value: number | string;
  itemId: number;
  field: string;
  type: 'number' | 'decimal' | 'text' | 'select';
  onValueChange: (itemId: number, field: string, value: string | number) => void;
  status: AutoSaveStatus;
  error?: string;
  disabled?: boolean;
  selectOptions?: { value: string | number; label: string }[];
}

/**
 * EDITABLE CELL - Inline uređivanje sa autosave statusom
 *
 * STATUS INDIKATORI:
 * - idle: Normalno stanje
 * - saving: Prikazuje loader (sprema se...)
 * - saved: Zelena cekvala (✓ Spravljeno)
 * - error: Crveni X (⚠ Greška)
 */

export const EditableCell: React.FC<EditableCellProps> = ({
  value,
  itemId,
  field,
  type,
  onValueChange,
  status,
  error,
  disabled = false,
  selectOptions = [],
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(String(value));
  const [isFocused, setIsFocused] = useState(false);

  // Sinhronizuj tempValue sa value kada se promeni spolja
  useEffect(() => {
    if (!isEditing) {
      setTempValue(String(value));
    }
  }, [value, isEditing]);

  const handleChange = useCallback(
    (newValue: string) => {
      setTempValue(newValue);
    },
    []
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    
    if (tempValue !== String(value)) {
      // Konvertuj vrednost prema tipu
      let finalValue: string | number = tempValue;
      if (type === 'number') {
        finalValue = parseInt(tempValue) || 0;
      } else if (type === 'decimal') {
        finalValue = parseFloat(tempValue) || 0;
      }

      onValueChange(itemId, field, finalValue);
    }

    setIsEditing(false);
  }, [itemId, field, tempValue, value, type, onValueChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTempValue(String(value));
    } else if (e.key === 'Tab') {
      handleBlur();
    }
  };

  // ==========================================
  // STATUS INDIKATOR
  // ==========================================

  const statusIcon = () => {
    switch (status) {
      case 'saving':
        return (
          <Tooltip title="Sprema se...">
            <CircularProgress size={16} sx={{ color: '#ff9800' }} />
          </Tooltip>
        );
      case 'saved':
        return (
          <Tooltip title="Spravljeno">
            <Check sx={{ fontSize: 18, color: '#4caf50' }} />
          </Tooltip>
        );
      case 'error':
        return (
          <Tooltip title={error || 'Greška pri čuvanju'}>
            <Error sx={{ fontSize: 18, color: '#f44336' }} />
          </Tooltip>
        );
      default:
        return null;
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <TableCell
      sx={{
        padding: '8px 12px',
        border: isFocused ? '2px solid #1976d2' : '1px solid #e0e0e0',
        backgroundColor: isEditing ? '#f5f5f5' : 'inherit',
        transition: 'all 0.2s',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
      onClick={() => !disabled && setIsEditing(true)}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
      >
        <Box flex={1}>
          {isEditing ? (
            type === 'select' ? (
              <TextField
                select
                size="small"
                value={tempValue}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                autoFocus
                disabled={disabled}
                fullWidth
                SelectProps={{
                  MenuProps: { PaperProps: { sx: { maxHeight: 300 } } },
                }}
              >
                {selectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </TextField>
            ) : (
              <TextField
                size="small"
                type={type === 'decimal' || type === 'number' ? 'number' : 'text'}
                inputProps={{
                  step: type === 'decimal' ? '0.01' : undefined,
                  disabled: disabled,
                }}
                value={tempValue}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                autoFocus
                fullWidth
              />
            )
          ) : (
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                color: error ? '#f44336' : 'inherit',
                textDecoration: error ? 'underline wavy' : 'none',
              }}
            >
              {type === 'decimal'
                ? parseFloat(String(value)).toFixed(2)
                : value}
            </Typography>
          )}
        </Box>

        {/* STATUS INDIKATOR */}
        <Fade in={status !== 'idle'}>
          <Box display="flex" alignItems="center">
            {statusIcon()}
          </Box>
        </Fade>
      </Box>

      {/* ERROR PORUKA ISPOD VREDNOSTI */}
      {error && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            color: '#f44336',
            mt: 0.5,
            fontStyle: 'italic',
          }}
        >
          {error}
        </Typography>
      )}
    </TableCell>
  );
};

export default EditableCell;
