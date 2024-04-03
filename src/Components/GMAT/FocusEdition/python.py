def calculate_final_score(section1_score, section2_score, section3_score):
    # Constants
    min_section_score = 60
    max_section_score = 90
    min_final_score = 205
    max_final_score = 805

    # Calculate total possible marks for each section
    total_possible_marks_per_section = max_section_score - min_section_score

    # Calculate total possible marks for all three sections
    total_possible_marks_all_sections = total_possible_marks_per_section * 3

    # Calculate the difference between the maximum and minimum final scores
    final_score_range = max_final_score - min_final_score

    # Calculate the scaling factor
    scaling_factor = final_score_range / total_possible_marks_all_sections

    # Calculate final score for all sections combined
    total_score = section1_score + section2_score + section3_score

    # Calculate final score
    final_score = round((total_score - (min_section_score * 3)) * scaling_factor + min_final_score)

    return final_score

# Example usage
section1_score = 60
section2_score = 80
section3_score = 70

final_score = calculate_final_score(section1_score, section2_score, section3_score)
print("Total Final Score:", final_score)
