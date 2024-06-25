export const ExceptionCode = {
  SUCCESS: { code: 'S000', message: '성공' },

  SYSTEM_ERROR: { code: 'E000', message: '시스템 에러' },
  SYSTEM_ERROR_DAILY_WOD_NOT_FOUND: { code: 'E001', message: 'Daily WOD를 찾을 수 없음' },

  FAIL_INVALID_PARAMETER: { code: 'F001', message: '올바르지 않은 파라미터' },
  FAIL_INVALID_REQUEST: { code: 'F002', message: '올바르지 않은 요청' },
  FAIL_NOT_FOUND_DATA: { code: 'F003', message: '존재하지 않는 데이터' },
  FAIL_DUPLICATED_DATA: { code: 'F004', message: '중복되는 데이터' },
  FAIL_UNAUTHORIZED: { code: 'F005', message: '인증 되지 않은 사용자' },
  FAIL_FORBIDDEN: { code: 'F006', message: '권한이 없는 사용자' },
  FAIL_UNIQUE_CONSTRAINT_VIOLATED: { code: 'F999', message: '이미 존재하는 데이터' }
}
