export type Severity = "low" | "medium" | "high";

//function gets a sighting count and just returns the severity
export function getSeverity(count: number): Severity
{
    if (count > 10)
    {
        return "high";
    }
    else if (count > 4)
    {
        return "medium";
    }
    else return "low";
}