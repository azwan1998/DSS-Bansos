<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TopsisController extends Controller
{
    public function topsis(Request $request)
    {
        // $data = $request->input('data');
        // $weights = $request->input('weights');
        // $benefit_criteria = $request->input('benefit_criteria');

        $data = [
            ['10', '8', '6', '4'],
            ['9', '7', '5', '3'],
            ['6', '4', '8', '2'],
            ['5', '3', '7', '1']
        ];
        
        $weights = [0.4, 0.3, 0.2, 0.1];
        
        $benefit_criteria = [true, true, true, true];
        
        // Convert the data to a matrix
        $matrix = array();
        foreach ($data as $row) {
            $matrix[] = array_values($row);
        }
        
        // Normalize the matrix
        foreach ($matrix as &$row) {
            for ($i = 0; $i < count($row); $i++) {
                $row[$i] /= sqrt(array_sum(array_column($matrix, $i)) / count($matrix));
            }
        }
        
        // Weight the matrix
        foreach ($matrix as &$row) {
            for ($i = 0; $i < count($row); $i++) {
                $row[$i] *= $weights[$i];
            }
        }
        
        // Determine the ideal and anti-ideal solutions
        $ideal_solution = array();
        $anti_ideal_solution = array();
        for ($i = 0; $i < count($matrix[0]); $i++) {
            $col = array_column($matrix, $i);
            if ($benefit_criteria[$i]) {
                $ideal_solution[] = max($col);
                $anti_ideal_solution[] = min($col);
            } else {
                $ideal_solution[] = min($col);
                $anti_ideal_solution[] = max($col);
            }
        }
        
        // Calculate the distance of each alternative to the ideal and anti-ideal solutions
        $distances = array();
        foreach ($matrix as $row) {
            $ideal_distance = 0;
            $anti_ideal_distance = 0;
            for ($i = 0; $i < count($row); $i++) {
                $ideal_distance += pow($row[$i] - $ideal_solution[$i], 2);
                $anti_ideal_distance += pow($row[$i] - $anti_ideal_solution[$i], 2);
            }
            $distances[] = sqrt($ideal_distance) / (sqrt($ideal_distance) + sqrt($anti_ideal_distance));
        }
        
        // Rank the alternatives based on their distance to the ideal solution
        $rankings = array();
        foreach ($distances as $key => $distance) {
            $rankings[] = array('index' => $key, 'distance' => $distance);
        }
        usort($rankings, function ($a, $b) {
            return $a['distance'] <=> $b['distance'];
        });
        
        // Return the rankings
        return response()->json($rankings);
    }
}
