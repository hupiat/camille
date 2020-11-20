package hupiat.camille.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Bad parameter")
public class BadValueException extends Exception {
  public BadValueException(String message) {
    super(message);
  }

  public BadValueException(String message, Throwable cause) {
    super(message, cause);
  }

  protected BadValueException(
      String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
    super(message, cause, enableSuppression, writableStackTrace);
  }
}
