#' @importFrom rlang .data
load_responses <- function(response_dir, question_type = NULL, default_type = "py") {
  if (is.null(question_type)) {
    question_type <- dplyr::tibble(
      question_num = integer(0),
      type = character(0)
    )
  }
  response_files <- withr::with_dir(response_dir, Sys.glob("*.json"))
  tibble::tibble(filename = response_files) |>
    tidyr::separate(.data$filename, into = c("question_num", "question_name"), sep = "-", remove = FALSE, extra = "merge") |>
    dplyr::mutate(question_num = as.integer(.data$question_num), question_name = stringr::str_sub(.data$question_name, end = -6L)) |>
    dplyr::rowwise() |>
    dplyr::mutate(responses = list(jsonlite::read_json(file.path(response_dir, .data$filename), simplifyVector = FALSE))) |>
    dplyr::ungroup() |>
    dplyr::select(-.data$filename) |>
    tidyr::unnest_longer(.data$responses) |>
    tidyr::unnest_wider(.data$responses) |>
    dplyr::mutate(id = NA_integer_, attempt = get0("attempt", ifnotfound = 1L)) |> # we didn't get these in the import.
    dplyr::rename(student = .data$name, contents = .data$essay, attempt_num = .data$attempt) |>
    dplyr::arrange(.data$question_num) |>
    # Label question types
    dplyr::left_join(question_type, by = "question_num") |>
    dplyr::mutate(type = dplyr::coalesce(.data$type, default_type))
}
